import './globals.css';

import type { AppProps } from 'next/app';
import Providers from './providers';
import Head from 'next/head';
import { Poppins } from 'next/font/google';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { arbitrumGoerli, avalancheFuji } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { useEffect, useState } from 'react';

import { HuddleClient, HuddleProvider } from '@huddle01/react';

const huddleClient = new HuddleClient({
  projectId: 'zMQHa6hH5hGrxfwYZp7z8I-1lWScI7UA',
  options: {
    activeSpeakers: {
      size: 8,
    },
  },
});

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [avalancheFuji],
  [publicProvider()]
);

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;

// NOTE: This may cause CORS errors during the development
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const { connectors } = getDefaultWallets({
  appName: 'RevitalizeAI',
  projectId: projectId,
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  //const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      <Head>
        <title>RevitalizeAI</title>
      </Head>
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains} modalSize='compact'>
          <Providers>
            <HuddleProvider client={huddleClient}>
              <Component {...pageProps} className={poppins.className} />
            </HuddleProvider>
          </Providers>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
