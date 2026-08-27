import { dbConnect } from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';
import Logo from '@/components/Logo';

export default async function ProfilePage() {
    await dbConnect();
    const p = await Portfolio.findOne({});

    const fields = [
        ['Portfolio ID', p.portfolioId],
        ['Rank', p.rank],
        ['Status', p.status.toUpperCase()],
    ];

    return (
        <main className="px-4 pt-8 max-w-lg mx-auto space-y-4">
            <div className="bg-[#0F1F3D] border border-[#1E3A5F] rounded-lg p-6 flex flex-col items-center text-center">
                <Logo />
                <p className="text-[#E8ECF4] font-semibold mt-3">{p.officerName}</p>
                <p className="text-[#7A8BA8] text-xs">{p.rank}</p>
            </div>

            <div className="bg-[#0F1F3D] border border-[#1E3A5F] rounded-lg p-5">
                <dl className="space-y-2.5 text-sm">
                    {fields.map(([label, value]) => (
                        <div key={label} className="flex justify-between">
                            <dt className="text-[#7A8BA8]">{label}</dt>
                            <dd className="text-[#E8ECF4] font-mono">{value}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            <form action="/api/auth/logout" method="POST">
                <button
                    type="submit"
                    className="w-full border border-[#DC2626]/40 text-[#DC2626] text-sm rounded py-2.5
                     hover:bg-[#DC2626]/10 transition"
                >
                    Log Out
                </button>
            </form>
        </main>
    );
}