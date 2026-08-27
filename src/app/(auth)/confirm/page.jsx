import Logo from '@/components/Logo';
import { dbConnect } from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';
import Link from 'next/link';

export default async function ConfirmPage({ searchParams }) {
    await dbConnect();
    const portfolio = await Portfolio.findOne({ portfolioId: searchParams.pid });

    return (
        <main className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-[#0F1F3D] border border-[#1E3A5F] rounded-lg p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#D4A73C]/10 border border-[#D4A73C]
                        flex items-center justify-center text-[#D4A73C] text-2xl mb-4">
                    ✓
                </div>
                <div className="flex justify-center mb-4"><Logo /></div>
                <h1 className="text-[#E8ECF4] font-semibold">Verification Successful</h1>
                <p className="text-[#7A8BA8] text-sm mt-1">Welcome, {portfolio.officerName}</p>
                <p className="text-[#7A8BA8] text-xs font-mono mt-2">{portfolio.portfolioId}</p>

                <Link
                    href="/dashboard"
                    className="block w-full bg-[#D4A73C] text-[#0A1628] font-semibold rounded py-2 mt-6
                     hover:brightness-110 transition"
                >
                    Continue to Dashboard
                </Link>
            </div>
        </main>
    );
}