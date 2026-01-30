import { getUsers } from '@/app/actions/admin';
import Link from 'next/link';

export default async function AdminUsersPage({ searchParams }: { searchParams: { page?: string, search?: string } }) {
    const page = Number(searchParams.page) || 1;
    const search = searchParams.search || '';
    const { users, total, pages } = await getUsers(page, 20, search);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Users</h1>
                <div className="text-sm text-gray-500">Total: {total}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Last Login</th>
                                <th className="px-6 py-4">Usage</th>
                                <th className="px-6 py-4">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{user.email}</td>
                                    <td className="px-6 py-4">
                                        {user.isVerified ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Verified
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                Unverified
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">{user.role}</td>
                                    <td className="px-6 py-4">
                                        {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : '-'}
                                    </td>
                                    <td className="px-6 py-4">{user.usageCount}</td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Simple Pagination */}
            <div className="flex justify-center gap-2">
                {page > 1 && (
                    <Link href={`/admin/users?page=${page - 1}`} className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                        Previous
                    </Link>
                )}
                {page < pages && (
                    <Link href={`/admin/users?page=${page + 1}`} className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                        Next
                    </Link>
                )}
            </div>
        </div>
    );
}
