import type { AppProps } from 'next/app';
import {
	chain,
	Chain,
	configureChains,
	createClient,
	WagmiConfig,
} from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../config/theme';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';

dayjs.extend(relativeTime);
dayjs.extend(duration);

function MyApp({ Component, pageProps }: AppProps) {
	const { chains, provider, webSocketProvider } = configureChains(
		[chain.localhost],
		[
			jsonRpcProvider({
				rpc: (chain: Chain) => {
					return {
						http: 'http://127.0.0.1:8545',
						webSocket: 'ws://127.0.0.1:8545',
					};
				},
			}),
		],
	);

	const client = createClient({
		autoConnect: true,
		connectors: [new MetaMaskConnector({ chains })],
		provider,
		webSocketProvider,
	});

	return (
		<ChakraProvider theme={theme}>
			<WagmiConfig client={client}>
				<Component {...pageProps} />
			</WagmiConfig>
		</ChakraProvider>
	);
}

export default MyApp;
