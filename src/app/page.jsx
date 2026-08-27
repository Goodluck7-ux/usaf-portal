// app/page.jsx
'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';

export default function HomePage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-[#0A1628] flex flex-col items-center justify-center px-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <Logo />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-[#E8ECF4] font-semibold text-xl text-center mt-5"
      >
        U.S. Air Force Officer Portfolio Portal
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="text-[#7A8BA8] text-sm text-center mt-2 max-w-xs"
      >
        Secure portfolio access for verified officer accounts.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        className="mt-8 w-full max-w-xs"
      >
        <Link
          href="/access"
          className="block w-full text-center bg-[#D4A73C] text-[#0A1628] font-semibold
                     rounded py-3 hover:brightness-110 transition"
        >
          Access Portal
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="flex items-center gap-2 mt-6 text-[#7A8BA8] text-xs"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#D4A73C]" />
        Military-grade UI, demo-grade backend
      </motion.div>
    </motion.main>
  );
}