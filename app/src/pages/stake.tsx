import { useRouter } from 'next/router';
import { useAccount, useDisconnect, useEnsName, useSigner } from 'wagmi';

const StakePage = () => {
	const { data: account } = useAccount();
	const { data: signer } = useSigner();
	const { data: ensName } = useEnsName({ address: account?.address });
	const router = useRouter();
	const onSuccess = () => {
		router.push('/');
	};
	const { disconnect, error } = useDisconnect({
		onSuccess,
	});

	return (
		account && (
			<div>
				<div>
					{ensName ? `${ensName} (${account.address})` : account.address}
				</div>
				<div>Connected to {account.connector?.name}</div>
				<button onClick={() => disconnect()}>Disconnect</button>
			</div>
		)
	);
};

export default StakePage;
