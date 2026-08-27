'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';

export default function AccessPage() {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        const res = await fetch('/api/auth/access', {
            method: 'POST',
            body: JSON.stringify({ accessCode: code }),
        });
        if (!res.ok) {
            setError('Access code not recognized.');
            return;
        }
        const { portfolioId } = await res.json();
        router.push(`/verify?pid=${portfolioId}`);
    }

    return (
        <main className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-[#0F1F3D] border border-[#1E3A5F] rounded-lg p-8">
            <div className="flex justify-center mb-4"><Logo /></div>
                <h1 className="text-[#E8ECF4] font-semibold text-lg text-center mb-1">
                    U.S. Air Force Officer Portfolio Portal
                </h1>
                <p className="text-[#7A8BA8] text-xs text-center mb-6">Secure Access Portal (USAF)</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block text-xs text-[#7A8BA8] uppercase tracking-wide">
                        Portfolio Access Code
                    </label>
                    <input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full bg-[#0A1628] border border-[#1E3A5F] rounded px-3 py-2
                       text-[#E8ECF4] font-mono tracking-wider focus:outline-none
                       focus:ring-2 focus:ring-[#D4A73C]"
                        placeholder="AF-XXXX-XXX-XX"
                    />
                    {error && <p className="text-[#DC2626] text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-[#D4A73C] text-[#0A1628] font-semibold rounded py-2
                       hover:brightness-110 transition"
                    >
                        Submit
                    </button>
                </form>
                <p className="text-[#7A8BA8] text-[10px] text-center mt-6">
                    This is the official access portal for all veterans — Highly Encrypted.
                </p>
            </div>
        </main>
    );
}