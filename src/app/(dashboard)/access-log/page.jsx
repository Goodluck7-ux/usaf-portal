import { dbConnect } from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';
import AccessLog from '@/models/AccessLog';
import ActivityFeedItem from '@/components/access-log/ActivityFeedItem';

export default async function AccessLogPage() {
    await dbConnect();
    const p = await Portfolio.findOne({});
    const logs = await AccessLog.find({ portfolioId: p.portfolioId })
        .sort({ timestamp: -1 })
        .limit(20);

    return (
        <main className="px-4 pt-8 max-w-lg mx-auto space-y-4">
            <h1 className="text-[#E8ECF4] font-semibold text-lg">Access Log</h1>

            <div className="bg-[#0F1F3D] border border-[#1E3A5F] rounded-lg p-5">
                <div className="flex justify-between text-sm">
                    <div>
                        <p className="text-[#7A8BA8] text-xs">Portfolio ID</p>
                        <p className="text-[#E8ECF4] font-mono">{p.portfolioId}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[#7A8BA8] text-xs">Total Accesses</p>
                        <p className="text-[#E8ECF4] font-semibold">{logs.length}</p>
                    </div>
                </div>
            </div>

            <div className="bg-[#0F1F3D] border border-[#1E3A5F] rounded-lg p-5">
                <p className="text-[#7A8BA8] text-xs uppercase tracking-wide mb-3">Recent Activity</p>
                <ul className="divide-y divide-[#1E3A5F]">
                    {logs.length === 0 && (
                        <li className="text-[#7A8BA8] text-sm py-4 text-center">
                            No activity yet — log in to generate entries.
                        </li>
                    )}
                    {logs.map((log) => (
                        <ActivityFeedItem key={log._id} log={log} />
                    ))}
                </ul>
            </div>

            <button
                className="w-full bg-[#D4A73C] text-[#0A1628] font-semibold rounded py-2.5
                   hover:brightness-110 transition"
            >
                Download Full Log
            </button>
        </main>
    );
}