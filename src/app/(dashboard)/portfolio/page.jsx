import { dbConnect } from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';
import AllocationDonut from '@/components/portfolio/AllocationDonut';
import PerformanceChart from '@/components/portfolio/PerformanceChart';

export default async function PortfolioPage() {
    await dbConnect();
    const p = await Portfolio.findOne({});

    return (
        <main className="px-4 pt-8 max-w-lg mx-auto space-y-4">
            <h1 className="text-[#E8ECF4] font-semibold text-lg">Portfolio Details</h1>
            <p className="text-[#7A8BA8] text-xs -mt-3">All values are visible but restricted from withdrawal</p>

            {/* Allocation card */}
            <div className="bg-[#0F1F3D] border border-[#1E3A5F] rounded-lg p-5">
                <p className="text-[#7A8BA8] text-xs uppercase tracking-wide mb-3">Asset Allocation</p>
                <AllocationDonut allocation={p.allocation} total={p.totalValue} />
                <ul className="mt-4 space-y-1.5 text-sm">
                    {Object.entries({
                        Equities: [p.allocation.equities, '#4ADE80'],
                        'Retirement (401k/TSP)': [p.allocation.retirement401k, '#60A5FA'],
                        'Fixed Income': [p.allocation.fixedIncome, '#D4A73C'],
                        'Real Estate': [p.allocation.realEstate, '#F472B6'],
                        'Cash & Equivalents': [p.allocation.cashEquivalents, '#7A8BA8'],
                    }).map(([label, [val, color]]) => (
                        <li key={label} className="flex items-center justify-between text-[#E8ECF4]">
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                                {label}
                            </span>
                            <span className="text-[#7A8BA8]">{val}%</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Retirement card — styled after the goal-progress reference */}
            <div className="bg-[#0F1F3D] border border-[#1E3A5F] rounded-lg p-5">
                <p className="text-[#7A8BA8] text-xs uppercase tracking-wide mb-3">Retirement (401k/TSP)</p>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[#E8ECF4] text-2xl font-semibold">
                            ${p.assets.retirement.toLocaleString()}
                        </p>
                        <p className="text-[#4ADE80] text-xs mt-1">YTD Return: 6.42%</p>
                    </div>
                </div>
            </div>

            {/* Performance chart */}
            <div className="bg-[#0F1F3D] border border-[#1E3A5F] rounded-lg p-5">
                <p className="text-[#7A8BA8] text-xs uppercase tracking-wide mb-3">Performance Overview (YTD)</p>
                <PerformanceChart />
            </div>
        </main>
    );
}