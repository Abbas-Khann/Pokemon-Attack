import { useEffect } from "react";
import type { AppProps } from "next/app";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import NextNProgress from "nextjs-progressbar";
import { WagmiConfig } from "wagmi";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useEthPrice } from "~~/hooks/scaffold-eth";
import { useAppStore } from "~~/services/store/store";
import "~~/styles/globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient } from 'wagmi';
import { Toaster } from "react-hot-toast";
import { polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
const { chains, provider } = configureChains(
  [polygonMumbai],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Pokemon-Wars',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const ScaffoldEthApp = ({ Component, pageProps }: AppProps) => {
  const price = useEthPrice();
  const setEthPrice = useAppStore(state => state.setEthPrice);

  useEffect(() => {
    if (price > 0) {
      setEthPrice(price);
    }
  }, [setEthPrice, price]);

  return (
    <WagmiConfig client={wagmiClient}>
      <NextNProgress />
      <RainbowKitProvider chains={chains} avatar={BlockieAvatar}>
        <div>
            <Component {...pageProps} />
            <Toaster />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default ScaffoldEthApp;
