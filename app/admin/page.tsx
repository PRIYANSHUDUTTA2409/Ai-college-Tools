import { getAdminKPIs } from '@/app/actions/admin';
import { Users, CheckCircle, Search, TrendingUp } from 'lucide-react';

export default async function AdminOverviewPage() {
    const kpis = await getAdminKPIs();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome back, Admin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard
                    title="Total Users"
                    value={kpis.totalUsers}
                    icon={<Users className="text-blue-600" />}
                    bg="bg-blue-50"
                />
                <KpiCard
                    title="Verified Users"
                    value={kpis.verifiedUsers}
                    icon={<CheckCircle className="text-green-600" />}
                    bg="bg-green-50"
                />
                <KpiCard
                    title="Total Searches"
                    value={kpis.totalSearches}
                    icon={<Search className="text-purple-600" />}
                    bg="bg-purple-50"
                />
                <KpiCard
                    title="Searches Today"
                    value={kpis.searchesToday}
                    icon={<TrendingUp className="text-orange-600" />}
                    bg="bg-orange-50"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Could add charts or recent activity here later */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-gray-700 mb-4">Most Used Tool</h3>
                    <div className="text-3xl font-bold text-gray-900">{kpis.mostUsedTool}</div>
                </div>
            </div>
        </div>
    );
}

function KpiCard({ title, value, icon, bg }: { title: string, value: number, icon: React.ReactNode, bg: string }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
            </div>
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${bg}`}>
                {icon}
            </div>
        </div>
    );
}
