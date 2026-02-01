'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  useDisconnectWallet,
  useWallet,
  useWalletConnection,
  useWalletSession,
} from '@solana/react-hooks';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Wallet,
  BarChart3,
  Settings,
  LogOut,
  Zap,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Page', href: '/dashboard/page-settings', icon: Wallet },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const disconnect = useDisconnectWallet();
  const router = useRouter();
  const wallet = useWallet();
  const connectedWallet = useWalletConnection();

  console.log(connectedWallet);
  const isConnected = wallet.status === 'connected';

  const handleDisconnect = async () => {
    await disconnect();
    router.push('/');
  };

  return (
    <div className='flex h-screen w-64 flex-col justify-between border-r border-white/5 bg-[#0a0a0a] px-4 py-6'>
      {/* 1. Logo Area */}
      <div>
        <div className='flex items-center gap-2 px-2 mb-8'>
          <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600'>
            <Zap className='h-4 w-4 text-white' />
          </div>
          <span className='text-xl font-bold tracking-tight text-white'>
            Tipp'd.
          </span>
        </div>

        {/* 2. Navigation Links */}
        <nav className='space-y-1'>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-600/10 text-blue-500'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white',
                )}>
                <item.icon className='h-4 w-4' />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 3. Footer / User Profile */}
      <div className='space-y-4'>
        {/* Your Public Page Link */}
        <div className='rounded-xl border border-white/5 bg-zinc-900/50 p-4'>
          <div className='mb-2 flex items-center justify-between text-xs text-zinc-500'>
            <span>Your Page</span>
            <ExternalLink className='h-3 w-3' />
          </div>
          <p className='text-sm font-medium text-white truncate'>
            tippd.xyz/user
          </p>
        </div>

        {/* User Info & Disconnect */}
        <div className='border-t border-white/5 pt-4'>
          <div className='flex items-center gap-3 px-2 mb-3'>
            <div className='h-8 w-8 rounded-full bg-linear-to-tr from-blue-500 to-purple-500' />
            <div className='overflow-hidden'>
              <p className='text-sm font-medium text-white truncate w-32'>
                {connectedWallet.currentConnector?.name}
              </p>
              <p className='text-xs text-zinc-500 truncate'>
                {isConnected &&
                  wallet.session.account.address.toString().slice(0, 8)}
                ...
              </p>
            </div>
          </div>

          <Button
            variant='ghost'
            className='w-full justify-start text-red-500 hover:bg-red-500/10 hover:text-red-400'
            onClick={handleDisconnect}>
            <LogOut className='mr-2 h-4 w-4' />
            Disconnect Wallet
          </Button>
        </div>
      </div>
    </div>
  );
}
