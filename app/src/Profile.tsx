import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi';

export function Profile() {
	const { data: account } = useAccount();
	const { data: ensName } = useEnsName({ address: account?.address });
	const { connect, connectors, error, isConnecting, pendingConnector } =
		useConnect();
	const { disconnect } = useDisconnect();

	if (account) {
		return (
			<div>
				<div>
					{ensName ? `${ensName} (${account.address})` : account.address}
				</div>
				<div>Connected to {account.connector?.name}</div>
				<button onClick={() => disconnect()}>Disconnect</button>
			</div>
		);
	}

	console.log(connectors);

	return (
		<div>
			{connectors.map(connector => (
				<button
					disabled={!connector.ready}
					key={connector.id}
					onClick={() => connect(connector)}
				>
					{connector.name}
					{!connector.ready && ' (unsupported)'}
					{isConnecting &&
						connector.id === pendingConnector?.id &&
						' (connecting)'}
				</button>
			))}
			{error && <div>{error.message}</div>}
		</div>
	);
}
