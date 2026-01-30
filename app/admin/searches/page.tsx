import { getSearchLogs } from '@/app/actions/admin';
import Link from 'next/link';

export default async function AdminSearchesPage({ searchParams }: { searchParams: { page?: string } }) {
    const page = Number(searchParams.page) || 1;
    const { logs, total, pages } = await getSearchLogs(page, 20);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Search Logs</h1>
                <div className="text-sm text-gray-500">Total: {total}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Tool</th>
                                <th className="px-6 py-4">Query</th>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-blue-600 rounded bg-blue-50/50 w-fit inline-block my-2 mx-4 text-xs uppercase tracking-wide">
                                        {log.tool}
                                    </td>
                                    <td className="px-6 py-4 max-w-md truncate" title={log.query}>
                                        {log.query}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {log.email || 'Anonymous'}
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 text-xs">
                                        {new Date(log.createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                            {logs.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                                        No logs found.
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
                    <Link href={`/admin/searches?page=${page - 1}`} className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                        Previous
                    </Link>
                )}
                {page < pages && (
                    <Link href={`/admin/searches?page=${page + 1}`} className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                        Next
                    </Link>
                )}
            </div>
        </div>
    );
}
