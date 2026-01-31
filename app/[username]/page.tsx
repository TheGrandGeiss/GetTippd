'use client';
import { motion } from 'framer-motion';
import { JetBrains_Mono, Inter } from 'next/font/google';

const mono = JetBrains_Mono({ subsets: ['latin'] });

export default function BentoProfile({
  params,
}: {
  params: { username: string };
}) {
  return (
    <div className='relative min-h-screen p-4 md:p-8 max-w-7xl mx-auto'>
      {/* Background Orbs */}
      <div className='aurora-bg'>
        <div className='orb bg-purple-600 top-[-10%] left-[-10%]' />
        <div className='orb bg-blue-600 bottom-[-10%] right-[-10%]' />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[180px]'>
        {/* 1. Identity Tile (2x2) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='md:col-span-2 md:row-span-2 glass-panel rounded-4xl p-8 flex flex-col justify-between'>
          <div className='flex items-center gap-4'>
            <div className='w-20 h-20 rounded-full bg-linear-to-tr from-[#9945FF] to-[#14F195] p-1'>
              <div className='w-full h-full rounded-full bg-black' />{' '}
              {/* Fallback PFP */}
            </div>
            <div>
              <h1 className='text-3xl font-bold tracking-tight uppercase'>
                @{params.username}
              </h1>
              <p className={`${mono.className} text-[#14F195] text-sm`}>
                Fke...geiss
              </p>
            </div>
          </div>
          <p className='text-[#9496BF] leading-relaxed max-w-sm'>
            Building the next generation of decentralized social tools on
            Solana. Your support keeps the lights on.
          </p>
        </motion.div>

        {/* 2. Total SOL Tile (2x1) */}
        <div className='md:col-span-2 glass-panel rounded-4xl p-6 flex flex-col justify-center'>
          <span className='text-xs uppercase tracking-widest text-[#9496BF]'>
            Total Liquid SOL
          </span>
          <div className='flex items-baseline gap-2'>
            <h2 className='text-5xl font-bold'>142.68</h2>
            <span className='text-[#14F195] font-bold'>SOL</span>
          </div>
          <span className='text-xs text-zinc-500'>≈ $21,402.00 USD</span>
        </div>

        {/* 3. Tipping Reactor (2x2) */}
        <div className='md:col-span-2 md:row-span-2 glass-panel rounded-4xl p-8 bg-white/2'>
          <h3 className='text-xl font-bold mb-6'>Support with SOL</h3>
          <div className='grid grid-cols-3 gap-2 mb-4'>
            {['0.1', '0.5', '1.0'].map((val) => (
              <button
                key={val}
                className='py-2 rounded-xl border border-zinc-800 hover:border-[#9945FF] transition-all bg-black/40'>
                {val} SOL
              </button>
            ))}
          </div>
          <textarea
            placeholder='Leave a message on-chain...'
            className='w-full h-32 bg-black/40 border border-zinc-800 rounded-xl p-4 mb-4 outline-none focus:border-[#9945FF] transition-all'
          />
          <button className='w-full bg-[#9945FF] py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_20px_rgba(153,69,255,0.4)] transition-all'>
            Send Tip
          </button>
        </div>

        {/* 4. Social Feed (2x1) */}
        <div className='md:col-span-2 glass-panel rounded-4xl p-6 overflow-hidden'>
          <h4 className='text-sm font-bold mb-4 flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full bg-[#14F195] animate-pulse' />
            Live Feed (Memos)
          </h4>
          <div className='space-y-3'>
            <div className='flex justify-between text-sm bg-black/20 p-3 rounded-lg border border-white/5'>
              <span className={`${mono.className} text-xs`}>0xAlice...</span>
              <span className='italic'>"LFG Franklin!"</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
