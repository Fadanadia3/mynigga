import { AppProps } from "next/app";
import { WagmiConfig, createClient } from "wagmi";
import { RainbowKitProvider, darkTheme, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient as createViemClient } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { polygon, mainnet } from "wagmi/chains";

// Configuration de Viem et Wagmi avec Infura
const { chains, provider } = configureChains(
  [mainnet, polygon],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY }), // Utilisation de l'API Infura
  ]
);

const { connectors } = getDefaultWallets({
  appName: "mon-projet-web3",
  chains,
});

// Client Wagmi
const client = createViemClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
