import Link from 'next/link';
import { Roboto_Condensed, Outfit } from 'next/font/google';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Globe,
  Wallet,
} from 'lucide-react';
import WalletConnectButton from '@/components/wallet-connect-button';

// Fonts
const fontHeading = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['300', '700', '900'],
});
const fontBody = Outfit({ subsets: ['latin'], weight: ['400', '500', '600'] });

export default function LandingPage() {
  return (
    <div
      className={`min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30 ${fontBody.className}`}>
      {/* 1. BACKGROUND GLOW EFFECTS */}
      <div className='fixed inset-0 z-0 pointer-events-none'>
        <div className='absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen' />
        <div className='absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full mix-blend-screen' />
      </div>

      {/* 2. NAVBAR (Simplified for Landing) */}
      <nav className='fixed top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0a]/60 backdrop-blur-xl'>
        <div className='mx-auto flex h-20 max-w-7xl items-center justify-between px-6'>
          <div className='flex items-center gap-2'>
            <div className='h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center'>
              <Zap className='h-5 w-5 text-white fill-white' />
            </div>
            <span
              className={`${fontHeading.className} text-2xl font-bold tracking-tight`}>
              GetTipp'd.
            </span>
          </div>

          <div className='hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400'>
            <Link
              href='#features'
              className='hover:text-white transition-colors'>
              Features
            </Link>
            <Link
              href='#creators'
              className='hover:text-white transition-colors'>
              Creators
            </Link>
            <Link
              href='#pricing'
              className='hover:text-white transition-colors'>
              Pricing
            </Link>
          </div>

          <div className='flex items-center gap-4'>
            {/* Reusing your wallet button here with custom styles */}
            <WalletConnectButton
              variant='outline'
              className='hidden sm:flex border-white/10 bg-white/5 hover:bg-white/10 hover:text-white'>
              Launch App
            </WalletConnectButton>
          </div>
        </div>
      </nav>

      <main className='relative z-10 flex flex-col items-center pt-32 pb-20 px-6'>
        {/* 3. HERO SECTION */}
        <section className='max-w-5xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000'>
          {/* Badge */}
          <div className='inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 backdrop-blur-md'>
            <span className='relative flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75'></span>
              <span className='relative inline-flex rounded-full h-2 w-2 bg-blue-500'></span>
            </span>
            Live on Solana Devnet
          </div>

          {/* Main Headline */}
          <h1
            className={`${fontHeading.className} text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter`}>
            Accept Crypto <br />
            <span className='bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent'>
              Without the Friction.
            </span>
          </h1>

          <p className='max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 leading-relaxed'>
            The fastest way to receive SOL tips from your community. No sign-ups
            required for donors. Instant settlement. 100% yours.
          </p>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4 pt-4'>
            <WalletConnectButton
              variant='default'
              className='h-14 px-8 text-lg bg-white text-black hover:bg-zinc-200 transition-transform hover:scale-105'>
              Start Receiving Tips
            </WalletConnectButton>

            <Button
              variant='ghost'
              className='h-14 px-8 text-lg text-zinc-400 hover:text-white hover:bg-white/5'>
              View Demo Profile <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          </div>

          {/* Social Proof / Stats */}
          <div className='pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 mt-16'>
            <Stat
              label='Total Volume'
              value='$2.4M+'
            />
            <Stat
              label='Active Creators'
              value='12k+'
            />
            <Stat
              label='Avg. Settlement'
              value='400ms'
            />
            <Stat
              label='Platform Fees'
              value='0%'
            />
          </div>
        </section>

        {/* 4. FEATURE GRID */}
        <section
          id='features'
          className='max-w-7xl mx-auto mt-40 w-full'>
          <div className='text-center mb-16'>
            <h2 className={`${fontHeading.className} text-4xl font-bold`}>
              Built for Speed
            </h2>
            <p className='text-zinc-400 mt-4'>
              Everything you need to monetize your audience.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-6'>
            <FeatureCard
              icon={<Wallet className='text-blue-400' />}
              title='Direct to Wallet'
              desc="No holding periods. Funds go directly from the fan's wallet to yours instantly."
            />
            <FeatureCard
              icon={<Shield className='text-violet-400' />}
              title='Censorship Resistant'
              desc='Your page, your rules. No one can freeze your funds or ban your account.'
            />
            <FeatureCard
              icon={<Globe className='text-indigo-400' />}
              title='Global Payments'
              desc='Accept payments from anyone, anywhere in the world. No borders, no banks.'
            />
          </div>
        </section>

        {/* 5. PREVIEW SECTION (The "Look Good" Visual) */}
        <section className='mt-40 w-full max-w-5xl mx-auto'>
          <div className='relative rounded-xl border border-white/10 bg-[#111] p-2 md:p-4 shadow-2xl shadow-blue-900/20'>
            {/* Fake Browser Bar */}
            <div className='flex items-center gap-2 mb-4 px-2'>
              <div className='flex gap-1.5'>
                <div className='w-3 h-3 rounded-full bg-red-500/20'></div>
                <div className='w-3 h-3 rounded-full bg-yellow-500/20'></div>
                <div className='w-3 h-3 rounded-full bg-green-500/20'></div>
              </div>
              <div className='ml-4 h-6 w-64 rounded-full bg-white/5'></div>
            </div>

            {/* The "App" Preview */}
            <div className='rounded-lg bg-zinc-950/50 h-[400px] md:h-[600px] flex items-center justify-center border border-white/5 relative overflow-hidden group'>
              <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10'></div>

              {/* Abstract Content */}
              <div className='text-center z-20 space-y-6'>
                <div className='w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-[2px]'>
                  <div className='w-full h-full rounded-full bg-black flex items-center justify-center'>
                    <span className='text-3xl'>😎</span>
                  </div>
                </div>
                <div>
                  <h3 className='text-2xl font-bold'>Franklin's Page</h3>
                  <p className='text-zinc-500'>@thegrandgeiss</p>
                </div>
                <div className='flex gap-2 justify-center'>
                  <div className='px-6 py-2 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-400'>
                    0.1 SOL
                  </div>
                  <div className='px-6 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer'>
                    0.5 SOL
                  </div>
                  <div className='px-6 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer'>
                    1.0 SOL
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. FOOTER */}
        <footer className='mt-40 w-full border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-500 text-sm'>
          <p>© 2026 Tipp'd Protocol. All rights reserved.</p>
          <div className='flex gap-6'>
            <Link
              href='x.com/TheGrandGeiss'
              className='hover:text-white'>
              Twitter
            </Link>
            <Link
              href=''
              className='hover:text-white'>
              Discord
            </Link>
            <Link
              href='https://github.com/theGrandGeiss/'
              className='hover:text-white'>
              GitHub
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex flex-col items-center gap-1'>
      <span className='text-3xl font-bold text-white'>{value}</span>
      <span className='text-sm font-medium text-zinc-500 uppercase tracking-wide'>
        {label}
      </span>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className='group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1'>
      <div className='mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 group-hover:bg-blue-500/20 transition-colors'>
        {icon}
      </div>
      <h3 className='mb-3 text-xl font-bold text-white'>{title}</h3>
      <p className='text-zinc-400 leading-relaxed'>{desc}</p>
    </div>
  );
}
