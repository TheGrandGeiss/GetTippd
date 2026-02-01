'use client';

import { useWallet, useDisconnectWallet } from '@solana/react-hooks';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, LogOut } from 'lucide-react';
import WalletConnectButton from '@/components/wallet-connect-button';

export default function HeroActions() {
  const wallet = useWallet();
  const disconnect = useDisconnectWallet();

  // STATE 1: USER IS LOGGED IN
  if (wallet.status === 'connected') {
    return (
      <div className='flex flex-col items-center gap-4 sm:flex-row animate-in fade-in zoom-in duration-300'>
        {/* Primary Action: Go to Dashboard */}
        <Link href='/dashboard'>
          <Button className='h-12 px-8 text-base font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-transform hover:scale-105'>
            Enter Dashboard <ArrowRight className='ml-2 h-4 w-4' />
          </Button>
        </Link>

        {/* Secondary Action: Disconnect */}
        <Button
          variant='ghost'
          onClick={() => disconnect()}
          className='h-12 px-6 text-red-400 hover:text-red-300 hover:bg-red-500/10'>
          <LogOut className='mr-2 h-4 w-4' />
          Disconnect
        </Button>
      </div>
    );
  }

  // STATE 2: USER IS NOT LOGGED IN
  return (
    <div className='flex flex-col items-center gap-4 sm:flex-row'>
      {/* Primary Action: Connect Wallet */}
      <WalletConnectButton
        variant='default'
        className='h-12 px-8 text-base font-bold bg-white text-black hover:bg-zinc-200 shadow-lg transition-transform hover:scale-105'>
        Start Tipping Now
      </WalletConnectButton>

      {/* Secondary Action: Demo / Docs */}
      <button className='text-sm font-semibold text-zinc-500 hover:text-white transition-colors'>
        View Documentation
      </button>
    </div>
  );
}
