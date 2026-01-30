import Link from 'next/link';
import { Home, Users, Search, BarChart3, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col h-screen sticky top-0">
                <div className="p-6 border-b border-gray-100">
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">
                            A
                        </div>
                        <span className="font-bold text-lg text-gray-900">Admin Panel</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors">
                        <Home className="h-5 w-5" />
                        <span className="font-medium">Overview</span>
                    </Link>
                    <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors">
                        <Users className="h-5 w-5" />
                        <span className="font-medium">Users</span>
                    </Link>
                    <Link href="/admin/searches" className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors">
                        <Search className="h-5 w-5" />
                        <span className="font-medium">Search Logs</span>
                    </Link>
                    <Link href="/admin/analytics" className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors">
                        <BarChart3 className="h-5 w-5" />
                        <span className="font-medium">Analytics</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <a href="/login" className="flex items-center gap-3 px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Sign Out</span>
                    </a>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-8 md:hidden">
                    <span className="font-bold text-lg">Admin Panel</span>
                    {/* Mobile menu toggle would go here */}
                </header>
                {children}
            </main>
        </div>
    );
}
