import React from 'react';
import {chain, Chain, configureChains, createClient, WagmiConfig} from 'wagmi'

import {MetaMaskConnector} from 'wagmi/connectors/metaMask'
import {Profile} from "./Profile";
import {jsonRpcProvider} from 'wagmi/providers/jsonRpc'
import {Example} from "./Example";

const {chains, provider, webSocketProvider} = configureChains([chain.localhost],
    [
        jsonRpcProvider({
            rpc: (chain: Chain) => {
                return {
                    http: "http://127.0.0.1:8545",
                    webSocket: "ws://127.0.0.1:8545"
                }
            }
        })
    ]
)

const client = createClient({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({chains}),
    ],
    provider,
    webSocketProvider,
})

function App() {
    return (
        <WagmiConfig client={client}>
            <Profile/>
            <Example/>
        </WagmiConfig>
    );
}

export default App;
