'use client';

import { useState, useEffect, ChangeEvent } from 'react'; // Added useEffect
import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/react-hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react'; // Added icons
import { createUser, checkUsernameAvailable } from '@/lib/actions/user'; // Import the new action

export default function OnboardingPage() {
  const wallet = useWallet();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // --- NEW STATE FOR USERNAME CHECK ---
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<
    boolean | null
  >(null);

  // --- SAFE WALLET EXTRACT ---
  const isConnected = wallet.status === 'connected';
  const publicKey = isConnected
    ? wallet.session.account.address.toString()
    : null;

  // --- DEBOUNCE EFFECT ---
  useEffect(() => {
    // 1. Reset availability if empty
    if (!username) {
      setIsUsernameAvailable(null);
      return;
    }

    // 2. Define the delay (500ms)
    const delayDebounce = setTimeout(async () => {
      if (username.length >= 3) {
        // Only check if 3+ chars
        setIsCheckingUsername(true);
        const available = await checkUsernameAvailable(username);
        setIsUsernameAvailable(available);
        setIsCheckingUsername(false);
      }
    }, 500);

    // 3. Cleanup: If user types again before 500ms, cancel the previous timer
    return () => clearTimeout(delayDebounce);
  }, [username]);

  const handleSubmit = async () => {
    if (!publicKey) return;
    setIsLoading(true);
    setError('');

    try {
      const result = await createUser({
        walletAddress: publicKey,
        username,
        displayName,
        bio,
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to create profile');
      }

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white p-4'>
      <Card className='w-full max-w-md border-white/10 bg-zinc-900/50 backdrop-blur-sm'>
        <CardHeader>
          <CardTitle className='text-2xl text-white'>
            Welcome to Tipp'd! 👋
          </CardTitle>
          <CardDescription className='text-zinc-400'>
            Let's claim your unique link so people can send you tips.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          {/* Display Name */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-zinc-300'>
              Display Name
            </label>
            <Input
              placeholder='e.g. Franklin K.'
              value={displayName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDisplayName(e.target.value)
              }
              className='bg-black/50 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-blue-500'
            />
          </div>

          {/* Username Input with Live Check */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-zinc-300'>
              Username (Unique Link)
            </label>
            <div className='relative'>
              <div className='flex items-center rounded-md border border-white/10 bg-black/50 px-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-[#0a0a0a]'>
                <span className='text-zinc-500 text-sm font-mono'>
                  tippd.xyz/
                </span>
                <input
                  className='flex h-10 w-full bg-transparent py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
                  placeholder='franklin'
                  value={username}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setUsername(
                      e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''),
                    );
                    setIsUsernameAvailable(null); // Reset status on type
                  }}
                />
              </div>

              {/* Status Indicator inside the input area */}
              <div className='absolute right-3 top-2.5'>
                {isCheckingUsername && (
                  <Loader2 className='h-4 w-4 animate-spin text-zinc-500' />
                )}
                {!isCheckingUsername &&
                  username.length >= 3 &&
                  isUsernameAvailable === true && (
                    <CheckCircle2 className='h-4 w-4 text-green-500' />
                  )}
                {!isCheckingUsername &&
                  username.length >= 3 &&
                  isUsernameAvailable === false && (
                    <XCircle className='h-4 w-4 text-red-500' />
                  )}
              </div>
            </div>

            {/* Helper Text below input */}
            <div className='min-h-[20px]'>
              {isCheckingUsername && (
                <p className='text-xs text-zinc-500'>
                  Checking availability...
                </p>
              )}
              {!isCheckingUsername && isUsernameAvailable === true && (
                <p className='text-xs text-green-500'>Username is available!</p>
              )}
              {!isCheckingUsername && isUsernameAvailable === false && (
                <p className='text-xs text-red-500'>
                  Username is already taken.
                </p>
              )}
            </div>
          </div>

          {/* Bio Input */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-zinc-300'>
              Tell Us About You
            </label>
            <textarea
              className='flex min-h-[80px] w-full resize-none rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]'
              placeholder='I build cool stuff on Solana...'
              value={bio}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setBio(e.target.value)
              }
            />
          </div>

          <Button
            className='w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all hover:scale-[1.02]'
            onClick={handleSubmit}
            // Disable if loading, missing data, OR username is taken
            disabled={
              isLoading ||
              !username ||
              !displayName ||
              isUsernameAvailable === false
            }>
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Creating Profile...
              </>
            ) : (
              'Create Profile'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
