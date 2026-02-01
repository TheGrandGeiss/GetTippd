'use client';

import {
  useConnectWallet,
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
import { LogOut, Wallet, Loader2 } from 'lucide-react';
import { WalletConnector } from '@solana/client';
import { cn } from '@/lib/utils';

type WalletButtonProps = React.ComponentProps<typeof Button>;

export default function WalletConnectButton({
  className,
  variant = 'outline',
  children,
  ...props
}: WalletButtonProps) {
  const wallets = useWalletConnection();
  const wallet = useWallet();

  // 1. RESTORED: The connect hook
  const connectWallet = useConnectWallet();
  const disconnectWallet = useDisconnectWallet();

  const [detected, setDetected] = useState<WalletConnector[]>([]);

  // 2. RESTORED: State for connection handling
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function truncate(address: string) {
    return `${address.slice(0, 4)}…${address.slice(-4)}`;
  }

  const isConnected = wallet.status === 'connected';
  const address = isConnected
    ? wallet.session.account.address.toString()
    : null;

  // 3. RESTORED: The async handler function
  async function handleConnect(connectorId: string) {
    try {
      setIsConnecting(true);
      setError(null);
      // Pass autoConnect: true if you want it to remember the choice next time
      await connectWallet(connectorId);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Unable to connect');
    } finally {
      setIsConnecting(false);
    }
  }

  useEffect(() => {
    const validWallets = wallets.connectors.filter(
      (wallet) => wallet.ready === true,
    );
    setDetected(validWallets);
  }, [wallets]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          className={cn('flex items-center gap-2', className)}
          disabled={isConnecting} // Disable button while connecting
          {...props}>
          {/* Show Loader if connecting, otherwise Wallet Icon */}
          {isConnecting ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <Wallet className='h-4 w-4' />
          )}

          {isConnected && address ? (
            <span className='font-mono'>{truncate(address)}</span>
          ) : (
            <span>{children || 'Connect Wallet'}</span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        className='w-[--radix-popper-anchor-width]'>
        {/* Error Message Display (Optional but helpful) */}
        {error && (
          <div className='p-2 text-xs text-red-500 bg-red-50 mb-1 rounded-sm'>
            {error}
          </div>
        )}

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
          // DISCONNECTED STATE
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
                  // 4. RESTORED: Using handleConnect instead of direct call
                  onClick={() => handleConnect(wallet.id)}
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
