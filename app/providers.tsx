'use client';

import { autoDiscover, type SolanaClientConfig } from '@solana/client';
import { SolanaProvider } from '@solana/react-hooks';

const defaultConfig: SolanaClientConfig = {
  cluster: 'devnet',
  rpc: 'https://solana-devnet.g.alchemy.com/v2/7VbrG1JnDRWuH9EzVfIud',
  websocket: 'wss://solana-devnet.g.alchemy.com/v2/7VbrG1JnDRWuH9EzVfIud',
  walletConnectors: autoDiscover(),
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SolanaProvider config={defaultConfig}>{children}</SolanaProvider>;
}
