import { arbitrum, bsc, gnosis, optimism, polygon } from 'viem/chains';
import { z } from 'zod';
import { useIsMounted } from '../hooks';

const walletConnectProjectId = z
  .string()
  .parse(process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID);

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, bsc, gnosis],
  // Configuration continue ici...
);

const { connectors } = getDefaultWallets({
  appName: 'Drain',
  projectId: walletConnectProjectId,  // Passer la variable une seule fois
  chains,
});

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;  // Un seul export
