'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const items = [
    { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { href: '/portfolio', label: 'Portfolio', icon: '📊' },
    { href: '/documents', label: 'Documents', icon: '📄' },
    { href: '/access-log', label: 'Access Log', icon: '🕓' },
    { href: '/profile', label: 'Profile', icon: '👤' },
];

export default function DashboardNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 inset-x-0 bg-[#0F1F3D] border-t border-[#1E3A5F]">
            <ul className="flex justify-around max-w-lg mx-auto">
                {items.map((item) => {
                    const active = pathname === item.href;
                    return (
                        <li key={item.href} className="relative flex-1">
                            <Link
                                href={item.href}
                                className={`flex flex-col items-center py-2.5 text-[11px] transition-colors
                            ${active ? 'text-[#D4A73C]' : 'text-[#7A8BA8]'}`}
                            >
                                <span className="text-lg">{item.icon}</span>
                                {item.label}
                            </Link>
                            {active && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    className="absolute top-0 inset-x-4 h-0.5 bg-[#D4A73C] rounded-full"
                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                />
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}