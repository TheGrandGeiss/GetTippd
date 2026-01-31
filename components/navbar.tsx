'use client';

import Link from 'next/link';
import { Roboto_Condensed, Outfit } from 'next/font/google';
import { MdSpaceDashboard, MdManageAccounts } from 'react-icons/md';
import WalletConnectButton from './wallet-connect-button';
import { useWallet } from '@solana/react-hooks';

const roboto_condensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  style: ['italic', 'normal'],
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const navLinks = [
  {
    text: 'Dashboard',
    href: '/dashboard',
    icon: <MdSpaceDashboard size={20} />, // Slightly smaller for better balance
  },
  {
    text: 'Manage Page',
    href: '/manage',
    icon: <MdManageAccounts size={20} />,
  },
];

const Navbar = () => {
  const wallet = useWallet();

  const isConnected = wallet.status === 'connected';
  return (
    // 1. Sticky header with Glassmorphism (blur) effect
    <nav className='sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-md supports-backdrop-filter:bg-background/60'>
      <section className='mx-auto flex h-20 max-w-4xl items-center justify-between px-6 lg:max-w-6xl'>
        {/* Logo Area */}
        <div>
          <Link
            href={'/'}
            className={`${roboto_condensed.className} group flex items-center gap-1 antialiased transition-opacity hover:opacity-90`}>
            {/* Added a gradient text effect specifically for "Web3" vibes */}
            <h2 className='bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-3xl font-black tracking-tighter text-transparent dark:from-blue-400 dark:to-violet-400'>
              GetTipp'd.
            </h2>
          </Link>
        </div>

        {isConnected && (
          <ul className='hidden items-center gap-8 md:flex'>
            {navLinks.map((link) => (
              <Link
                href={link.href}
                key={link.text}
                className={`${outfit.className} group relative flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground`}>
                <span>{link.text}</span>
                <span className='text-muted-foreground transition-transform duration-300 group-hover:-rotate-12 group-hover:text-primary'>
                  {link.icon}
                </span>

                {/* Animated underline effect */}
                <span className='absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full' />
              </Link>
            ))}
          </ul>
        )}

        {/* Wallet Button Area */}
        <div className='flex items-center gap-4'>
          <WalletConnectButton />
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
