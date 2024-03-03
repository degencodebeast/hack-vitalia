import { Chain } from "@wagmi/core";

export const appName = 'REJUVENATE_AI';
export const communityAddr = "0x5A55F1C417fB81D1066ecf34C5f1caFa38D498D2"

export const shido = {
    id: 9007,
    name: "Shido Testnet",
    network: "Shido",
    nativeCurrency: {
      decimals: 18,
      name: "SHIDO",
      symbol: "SHIDO",
    },
    rpcUrls: {
      public: { http: ["https://rpc-testnet-nodes.shidoscan.com"] },
      default: { http: ["https://rpc-testnet-nodes.shidoscan.com"] },
    },
    blockExplorers: {
      etherscan: { name: "expolorer", url: "https://shidoscan.com" },
      default: { name: "expolorer", url: "https://shidoscan.com" },
    },
  
  } as const satisfies Chain;