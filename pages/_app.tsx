import { arbitrum, bsc, gnosis, optimism, polygon } from 'viem/chains';
import { z } from 'zod';
import { useIsMounted } from '../hooks';

// Ensure that the environment variable is correctly set in your .env file
const walletConnectProjectId = z
  .string()
  .parse(process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID);  // Use only this variable

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, bsc, gnosis],
  // Other configuration...
);

const { connectors } = getDefaultWallets({
  appName: 'Drain',
  projectId: walletConnectProjectId,  // Only pass it once
  chains,
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Component {...pageProps} />
  );
};

export default App;
