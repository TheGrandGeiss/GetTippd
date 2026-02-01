'use client';

import { useWallet } from '@solana/react-hooks';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { checkUserStatus } from '@/lib/actions/user'; // Ensure this path matches your action file

export default function AuthListener() {
  const wallet = useWallet();
  const router = useRouter();
  const pathname = usePathname();

  const isConnected = wallet.status === 'connected';
  const publicKey = isConnected ? wallet.session.account.address : null;

  useEffect(() => {
    const handleAuthRouting = async () => {
      // Only run this logic if we are properly connected & have a key
      if (isConnected && publicKey) {
        // Call the Server Action to check DB
        const status = await checkUserStatus(publicKey.toString());

        if (status.exists) {
          if (!pathname.startsWith('/dashboard')) {
            router.push('/dashboard');
          }
        } else {
          // New User -> Go to Onboarding
          // (Prevent infinite loop if already there)
          if (pathname !== '/onboarding') {
            router.push('/onboarding');
          }
        }
      }
    };

    handleAuthRouting();
  }, [isConnected, publicKey, router, pathname]);

  // This component renders nothing, it just runs logic
  return null;
}
