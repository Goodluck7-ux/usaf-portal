'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Logo from '@/components/Logo';

export default function VerifyPage() {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const portfolioId = useSearchParams().get('pid');

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/verify-password', {
                method: 'POST',
                body: JSON.stringify({ portfolioId, password }),
            });

            if (!res.ok) {
                setError('Incorrect password. Please try again.');
                setLoading(false);
                return;
            }

            router.push(`/confirm?pid=${portfolioId}`);
        } catch {
            setError('Something went wrong. Please try again.');
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-[#0F1F3D] border border-[#1E3A5F] rounded-lg p-8">
                <div className="flex justify-center mb-4"><Logo /></div>
                <h1 className="text-[#E8ECF4] font-semibold text-center mb-1">Identity Verification</h1>
                <p className="text-[#7A8BA8] text-xs text-center mb-6">Enter your portfolio password</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full bg-[#0A1628] border border-[#1E3A5F] rounded px-3 py-2
                       text-[#E8ECF4] focus:outline-none focus:ring-2 focus:ring-[#D4A73C]"
                        autoFocus
                    />
                    {error && <p className="text-[#DC2626] text-sm">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#D4A73C] text-[#0A1628] font-semibold rounded py-2
                       hover:brightness-110 transition disabled:opacity-60"
                    >
                        {loading ? 'Verifying…' : 'Verify Identity'}
                    </button>
                </form>
            </div>
        </main>
    );
}