import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum"
import { configureChains, mainnet, goerli, createClient } from "wagmi"

import { WALLET_CONNECT_PROJECT_ID } from "~/utils/constants"

let NODE_ENV: any = "development"

if (typeof window !== "undefined") {
  NODE_ENV = window.ENV.NODE_ENV
}

const chains = NODE_ENV === "production" ? [mainnet] : [goerli]

const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: WALLET_CONNECT_PROJECT_ID }),
])

// Wagmi client
export const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
})

// Web3Modal Ethereum Client
export const ethereumClient = new EthereumClient(wagmiClient, chains)
