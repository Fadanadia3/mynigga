import { AppProps } from "next/app";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { RainbowKitProvider, darkTheme, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { infuraProvider } from "wagmi/providers/infura";
import { mainnet } from "wagmi/chains";

// Configurer les chaînes
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet], // Ajoute d'autres chaînes si nécessaire
  [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY! })]
);

// Obtenir les connecteurs de portefeuilles
const { connectors } = getDefaultWallets({
  appName: "MonApp",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains,
});

// Créer la configuration wagmi
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
