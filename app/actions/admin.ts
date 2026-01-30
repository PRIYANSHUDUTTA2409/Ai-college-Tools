'use server'

import { PrismaClient } from '@prisma/client'

// Use a singleton pattern for PrismaClient to avoid too many connections in dev
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function getAdminKPIs() {
    const totalUsers = await prisma.user.count()
    const verifiedUsers = await prisma.user.count({ where: { isVerified: true } })
    const totalSearches = await prisma.searchLog.count()

    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)
    const searchesToday = await prisma.searchLog.count({
        where: { createdAt: { gte: startOfDay } }
    })

    // Basic "most used tool" heuristic
    const tools = await prisma.searchLog.groupBy({
        by: ['tool'],
        _count: { tool: true },
        orderBy: { _count: { tool: 'desc' } },
        take: 1,
    })
    const mostUsedTool = tools[0] ? tools[0].tool : 'N/A'

    return {
        totalUsers,
        verifiedUsers,
        totalSearches,
        searchesToday,
        mostUsedTool
    }
}

export async function getUsers(page = 1, pageSize = 20, search = '') {
    const skip = (page - 1) * pageSize
    const where = search ? {
        OR: [
            { email: { contains: search, mode: 'insensitive' as const } },
            { id: { contains: search, mode: 'insensitive' as const } }
        ]
    } : {}

    const [users, total] = await Promise.all([
        prisma.user.findMany({
            where,
            skip,
            take: pageSize,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                email: true,
                role: true,
                isVerified: true,
                createdAt: true,
                lastLogin: true,
                usageCount: true
            }
        }),
        prisma.user.count({ where })
    ])

    return { users, total, pages: Math.ceil(total / pageSize) }
}

export async function getSearchLogs(page = 1, pageSize = 20) {
    const skip = (page - 1) * pageSize

    const [logs, total] = await Promise.all([
        prisma.searchLog.findMany({
            skip,
            take: pageSize,
            orderBy: { createdAt: 'desc' },
        }),
        prisma.searchLog.count()
    ])

    return { logs, total, pages: Math.ceil(total / pageSize) }
}

export async function getAnalytics() {
    // Simple analytics: searches per day for last 7 days
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const logs = await prisma.searchLog.findMany({
        where: { createdAt: { gte: sevenDaysAgo } },
        select: { createdAt: true, tool: true }
    })

    // Aggregate by date
    const searchesByDate: Record<string, number> = {}
    const toolDistribution: Record<string, number> = {}

    logs.forEach(log => {
        const date = log.createdAt.toISOString().split('T')[0]
        searchesByDate[date] = (searchesByDate[date] || 0) + 1

        toolDistribution[log.tool] = (toolDistribution[log.tool] || 0) + 1
    })

    return { searchesByDate, toolDistribution }
}
