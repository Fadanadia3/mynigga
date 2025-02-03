@@ -22,9 +22,10 @@ import { arbitrum, bsc, gnosis, optimism, polygon } from 'viem/chains';
import { z } from 'zod';
import { useIsMounted } from '../hooks';

// Ensure that the environment variable is correctly set in your .env file
const walletConnectProjectId = z
  .string()
  .parse(process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID);
  .parse(process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID);  // Ensure that this variable is correctly set in .env

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, bsc, gnosis],
@@ -33,7 +34,7 @@ const { chains, publicClient } = configureChains(

const { connectors } = getDefaultWallets({
  appName: 'Drain',
  projectId: walletConnectProjectId,
  projectId: walletConnectProjectId, // Pass the projectId from environment variable
  chains,
});

@@ -75,4 +76,4 @@ const App = ({ Component, pageProps }: AppProps) => {
  );
};

export default App;
export default App;
