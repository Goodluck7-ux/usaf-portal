import { dbConnect } from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';
import SummaryCard from '@/components/dashboard/SummaryCard';
import PortfolioStatusBadge from '@/components/dashboard/PortfolioStatusBadge';

export default async function DashboardPage() {
    await dbConnect();
    const portfolio = await Portfolio.findOne({}); // demo: single seeded portfolio

    return (
        <main className="px-4 pt-8 max-w-lg mx-auto">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#D4A73C]/10 border border-[#D4A73C]
                        flex items-center justify-center text-[#D4A73C]">
                    ⛨
                </div>
                <div>
                    <p className="text-[#E8ECF4] font-semibold text-sm">Officer Portfolio Dashboard</p>
                    <p className="text-[#7A8BA8] text-xs">{portfolio.officerName}</p>
                </div>
            </div>

            <div className="bg-[#0F1F3D] border border-[#1E3A5F] rounded-lg p-5 mb-4">
                <PortfolioStatusBadge status={portfolio.status} />
                <p className="text-[#E8ECF4] text-3xl font-semibold mt-3">
                    ${portfolio.totalValue.toLocaleString()}
                </p>
                <p className="text-[#7A8BA8] text-xs">
                    {portfolio.status === 'frozen' ? '(Locked)' : ''} Last valuation updated automatically
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <SummaryCard label="Retirement" value={portfolio.assets.retirement} />
                <SummaryCard label="Investments" value={portfolio.assets.investments} />
                <SummaryCard label="Real Assets" value={portfolio.assets.realAssets} />
                <SummaryCard label="Other Assets" value={portfolio.assets.other} />
            </div>
        </main>
    );
}