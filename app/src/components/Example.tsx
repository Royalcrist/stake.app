import { useCallback, useEffect, useState } from 'react';
import { useAccount, useProvider, useSigner } from 'wagmi';
import {
	listTokensOfOwner,
	getContractAddress,
} from '../services/ContractService';
import { FakeNft__factory } from '../contracts';

const Example = () => {
	const { data: account } = useAccount();
	const { data: signer } = useSigner();

	const provider = useProvider();
	const networkId = provider.network.chainId;
	const contractAddress = getContractAddress('FakeNft', networkId);
	const [tokens, setTokens] = useState<string[]>([]);

	const fetchTokens = useCallback(async () => {
		if (!account?.address) return;

		let tokens = await listTokensOfOwner(
			FakeNft__factory.connect(contractAddress, provider),
			account.address,
		);

		setTokens(tokens);
	}, [account, contractAddress, provider]);

	useEffect(() => {
		fetchTokens();
	}, [fetchTokens]);

	const mint = async () => {
		if (!account?.address || !signer) return;

		let contract = FakeNft__factory.connect(contractAddress, signer);

		await contract.mint(account.address);
	};

	return (
		<div>
			{account ? (
				<div>
					<button onClick={mint}>Mint NFT</button>
					<div>
						{tokens.map(t => {
							return <p key={t}>Token: {t}</p>;
						})}
					</div>
				</div>
			) : (
				<>Connect your wallet first now</>
			)}
		</div>
	);
};

export default Example;
