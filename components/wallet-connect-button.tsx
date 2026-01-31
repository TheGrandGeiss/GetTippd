'use client';

import {
  useDisconnectWallet,
  useWallet,
  useWalletConnection,
} from '@solana/react-hooks';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LogOut, Wallet } from 'lucide-react';
import { WalletConnector } from '@solana/client';
import { cn } from '@/lib/utils';

// 1. FIX: Automatically inherit ALL props from your existing Button component
// This fixes the "Property 'variant' does not exist" error.
type WalletButtonProps = React.ComponentProps<typeof Button>;

export default function WalletConnectButton({
  className,
  variant = 'outline', // Default styling
  children,
  ...props // Captures onClick, size, and anything else passed
}: WalletButtonProps) {
  const wallets = useWalletConnection();
  const wallet = useWallet();
  const disconnectWallet = useDisconnectWallet();

  const [detected, setDetected] = useState<WalletConnector[]>([]);

  function truncate(address: string) {
    return `${address.slice(0, 4)}…${address.slice(-4)}`;
  }

  const isConnected = wallet.status === 'connected';
  const address = isConnected
    ? wallet.session.account.address.toString()
    : null;

  useEffect(() => {
    // Filter only installed wallets
    const validWallets = wallets.connectors.filter(
      (wallet) => wallet.ready === true,
    );
    setDetected(validWallets);
  }, [wallets]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* 2. FIX: Pass '...props' to the Button so it receives the variant/size */}
        <Button
          variant={variant}
          className={cn('flex items-center gap-2', className)}
          {...props}>
          <Wallet className='h-4 w-4' />
          {isConnected && address ? (
            <span className='font-mono'>{truncate(address)}</span>
          ) : (
            // If text is passed (like "Start Tipping"), show it. Else default.
            <span>{children || 'Connect Wallet'}</span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        className='w-[--radix-popper-anchor-width]'>
        {isConnected && address ? (
          // CONNECTED STATE
          <div className='p-1'>
            <div className='px-2 py-1.5'>
              <p className='text-[10px] font-bold uppercase tracking-wider text-muted-foreground'>
                Connected
              </p>
              <p className='font-mono text-sm font-medium leading-none mt-1'>
                {truncate(address)}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => disconnectWallet()}
              className='cursor-pointer text-red-500 focus:bg-red-50 focus:text-red-600'>
              <LogOut className='mr-2 h-4 w-4' />
              Disconnect
            </DropdownMenuItem>
          </div>
        ) : (
          // DISCONNECTED STATE (Wallet List)
          <>
            <DropdownMenuLabel>Available Wallets</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {detected.length === 0 ? (
              <div className='p-2 text-sm text-muted-foreground text-center'>
                No wallets found.
                <br />
                <a
                  href='https://phantom.app'
                  target='_blank'
                  className='text-blue-500 underline'>
                  Get Phantom
                </a>
              </div>
            ) : (
              detected.map((wallet) => (
                <DropdownMenuItem
                  key={wallet.id || wallet.name}
                  onClick={() => wallet.connect()}
                  className='cursor-pointer flex items-center justify-between'>
                  <span className='font-medium'>{wallet.name}</span>
                  {wallet.icon && (
                    <img
                      src={wallet.icon}
                      alt={wallet.name}
                      className='h-6 w-6 rounded-sm object-contain'
                    />
                  )}
                </DropdownMenuItem>
              ))
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
