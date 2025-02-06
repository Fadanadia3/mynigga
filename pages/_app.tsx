import { AppProps } from "next/app";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { RainbowKitProvider, darkTheme, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { infuraProvider } from "wagmi/providers/infura";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

// Configurer les chaînes
const { chains, provider, webSocketProvider } = configureChains(
  [
    {
      id: 1, // Exemple pour Ethereum Mainnet, ajuste selon tes besoins
      name: "Ethereum",
      network: "mainnet",
      rpcUrl: "https://mainnet.infura.io/v3/" + process.env.NEXT_PUBLIC_INFURA_API_KEY,
    },
    // Ajoute d'autres chaînes ici si nécessaire
  ],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: chain.rpcUrls.default,
        webSocket: chain.rpcUrls.ws,
      }),
    }),
  ]
);

// Créer le client wagmi
const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
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
