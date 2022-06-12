import dynamic from 'next/dynamic';
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi';

const Profile = () => {
	const { data: account } = useAccount();
	const { data: ensName } = useEnsName({ address: account?.address });
	const { connect, connectors, error, isConnecting, pendingConnector } =
		useConnect();
	const { disconnect } = useDisconnect();

	return account ? (
		<>
			<div>{ensName ? `${ensName} (${account.address})` : account.address}</div>
			<div>Connected to {account.connector?.name}</div>
			<button onClick={() => disconnect()}>Disconnect</button>
		</>
	) : (
		<>
			{connectors?.length &&
				connectors.map(connector => (
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
		</>
	);
};

export default dynamic(async () => Profile, {
	ssr: false,
});
