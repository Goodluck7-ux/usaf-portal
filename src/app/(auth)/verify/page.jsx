'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';
import Logo from '@/components/Logo';

function VerifyContent() {
    const [scanning, setScanning] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();
    const searchParams = useSearchParams();
    const portfolioId = searchParams.get('pid');

    async function handleScan() {
        if (!portfolioId) {
            setError('Missing portfolio ID.');
            return;
        }

        setScanning(true);
        setError('');

        try {
            // Check if this portfolio already has a registered credential
            const optRes = await fetch('/api/auth/webauthn/authenticate-options', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ portfolioId }),
            });

            if (optRes.status === 404) {
                // First time — enroll
                const regOptRes = await fetch('/api/auth/webauthn/register-options', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ portfolioId }),
                });

                if (!regOptRes.ok) {
                    throw new Error('Failed to get registration options');
                }

                const regOptions = await regOptRes.json();

                const regResponse = await startRegistration(regOptions);

                const verifyRes = await fetch(
                    '/api/auth/webauthn/register-verify',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            portfolioId,
                            response: regResponse,
                        }),
                    },
                );

                if (!verifyRes.ok) {
                    throw new Error('Registration verification failed');
                }
            } else {
                const authOptions = await optRes.json();

                const authResponse = await startAuthentication(authOptions);

                const verifyRes = await fetch(
                    '/api/auth/webauthn/authenticate-verify',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            portfolioId,
                            response: authResponse,
                        }),
                    },
                );

                if (!verifyRes.ok) {
                    throw new Error('Verification failed');
                }
            }

            router.push(`/confirm?pid=${portfolioId}`);
        } catch (err) {
            console.error('Biometric verification error:', err);
            setError('Biometric verification failed or was cancelled.');
        } finally {
            setScanning(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-[#0F1F3D] border border-[#1E3A5F] rounded-lg p-8 text-center">
                <div className="flex justify-center mb-4">
                    <Logo />
                </div>

                <h1 className="text-[#E8ECF4] font-semibold mb-6">
                    Identity Verification
                </h1>

                <button
                    onClick={handleScan}
                    disabled={scanning}
                    className={`relative w-28 h-28 mx-auto rounded-full border-2 border-[#D4A73C]
                      flex items-center justify-center overflow-hidden
                      ${scanning ? 'animate-pulse' : ''}`}
                >
                    <span className="text-4xl">🔒</span>

                    {scanning && (
                        <span className="absolute inset-x-0 h-0.5 bg-[#D4A73C] animate-[scan_1.5s_linear_infinite]" />
                    )}
                </button>

                <p className="text-[#7A8BA8] text-sm mt-4">
                    {scanning
                        ? 'Waiting for device biometric prompt…'
                        : 'Tap to scan fingerprint / Face ID'}
                </p>

                {error && (
                    <p className="text-[#DC2626] text-sm mt-2">
                        {error}
                    </p>
                )}
            </div>

            <style jsx>{`
                @keyframes scan {
                    0% {
                        top: 10%;
                    }

                    50% {
                        top: 90%;
                    }

                    100% {
                        top: 10%;
                    }
                }
            `}</style>
        </main>
    );
}

export default function VerifyPage() {
    return (
        <Suspense
            fallback={
                <main className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
                    <div className="w-full max-w-sm bg-[#0F1F3D] border border-[#1E3A5F] rounded-lg p-8 text-center">
                        <div className="flex justify-center mb-4">
                            <Logo />
                        </div>

                        <p className="text-[#7A8BA8] text-sm">
                            Loading verification…
                        </p>
                    </div>
                </main>
            }
        >
            <VerifyContent />
        </Suspense>
    );
}