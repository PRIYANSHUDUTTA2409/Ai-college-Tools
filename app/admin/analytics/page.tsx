import { getAnalytics } from '@/app/actions/admin';

export default async function AdminAnalyticsPage() {
    const { searchesByDate, toolDistribution } = await getAnalytics();

    // Sort dates
    const sortedDates = Object.keys(searchesByDate).sort();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                <p className="text-gray-500">Recent platform usage data.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Searches Last 7 Days */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-6">Searches (Last 7 Days)</h3>
                    <div className="space-y-4">
                        {sortedDates.map(date => {
                            const count = searchesByDate[date];
                            // Simple bar viz, max width assumed ~100 searches for scale
                            const width = Math.min((count / 20) * 100, 100);
                            return (
                                <div key={date} className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">{new Date(date).toLocaleDateString()}</span>
                                        <span className="font-medium">{count}</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 rounded-full"
                                            style={{ width: `${width}%`, minWidth: '4px' }}
                                        ></div>
                                    </div>
                                </div>
                            )
                        })}
                        {sortedDates.length === 0 && (
                            <div className="text-center text-gray-400 py-8">Not enough data yet.</div>
                        )}
                    </div>
                </div>

                {/* Tool Distribution */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-6">Tool Usage Distribution</h3>
                    <div className="space-y-4">
                        {Object.entries(toolDistribution).map(([tool, count]) => {
                            const total = Object.values(toolDistribution).reduce((a, b) => a + b, 0);
                            const percentage = total ? Math.round((count / total) * 100) : 0;
                            return (
                                <div key={tool} className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="capitalize text-gray-700">{tool}</span>
                                        <span className="font-medium text-gray-900">{count} ({percentage}%)</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-purple-500 rounded-full"
                                            style={{ width: `${percentage}%`, minWidth: '4px' }}
                                        ></div>
                                    </div>
                                </div>
                            )
                        })}
                        {Object.keys(toolDistribution).length === 0 && (
                            <div className="text-center text-gray-400 py-8">No usage data available.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
