import Logo from '@/components/Logo';
import { dbConnect } from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';
import Link from 'next/link';

export default async function ConfirmPage({ searchParams }) {
    const params = await searchParams;
    const portfolioId = params?.pid;

    if (!portfolioId) {
        return (
            <main className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
                <div className="w-full max-w-sm bg-[#0F1F3D] border border-[#1E3A5F] rounded-lg p-8 text-center">
                    <div className="flex justify-center mb-4">
                        <Logo />
                    </div>

                    <h1 className="text-[#E8ECF4] font-semibold">
                        Invalid Verification
                    </h1>

                    <p className="text-[#7A8BA8] text-sm mt-2">
                        No portfolio ID was provided.
                    </p>

                    <Link
                        href="/"
                        className="block w-full bg-[#D4A73C] text-[#0A1628] font-semibold rounded py-2 mt-6 hover:brightness-110 transition"
                    >
                        Return Home
                    </Link>
                </div>
            </main>
        );
    }

    await dbConnect();

    const portfolio = await Portfolio.findOne({ portfolioId }).lean();

    if (!portfolio) {
        return (
            <main className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
                <div className="w-full max-w-sm bg-[#0F1F3D] border border-[#1E3A5F] rounded-lg p-8 text-center">
                    <div className="flex justify-center mb-4">
                        <Logo />
                    </div>

                    <h1 className="text-[#E8ECF4] font-semibold">
                        Portfolio Not Found
                    </h1>

                    <p className="text-[#7A8BA8] text-sm mt-2">
                        We could not find the portfolio associated with this verification.
                    </p>

                    <p className="text-[#7A8BA8] text-xs font-mono mt-3 break-all">
                        {portfolioId}
                    </p>

                    <Link
                        href="/"
                        className="block w-full bg-[#D4A73C] text-[#0A1628] font-semibold rounded py-2 mt-6 hover:brightness-110 transition"
                    >
                        Return Home
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-[#0F1F3D] border border-[#1E3A5F] rounded-lg p-8 text-center">
                <div
                    className="w-16 h-16 mx-auto rounded-full bg-[#D4A73C]/10 border border-[#D4A73C]
                    flex items-center justify-center text-[#D4A73C] text-2xl mb-4"
                >
                    ✓
                </div>

                <div className="flex justify-center mb-4">
                    <Logo />
                </div>

                <h1 className="text-[#E8ECF4] font-semibold">
                    Verification Successful
                </h1>

                <p className="text-[#7A8BA8] text-sm mt-1">
                    Welcome, {portfolio.officerName}
                </p>

                <p className="text-[#7A8BA8] text-xs font-mono mt-2">
                    {portfolio.portfolioId}
                </p>

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