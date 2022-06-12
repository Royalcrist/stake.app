import { Result } from '@ethersproject/abi';
import { FakeNft } from '../contracts';
import FakeNftAbi from '../contracts/FakeNft.json';
import FakeCoinAbi from '../contracts/FakeCoin.json';
import FakeStakeAbi from '../contracts/FakeStake.json';

type Network = { [key: string]: any };

const getContractAddress = (
	contract: 'FakeNft' | 'FakeCoin' | 'FakeStake',
	networkId: number | string,
): string => {
	const contractsAbi = {
		FakeNft: FakeNftAbi,
		FakeCoin: FakeCoinAbi,
		FakeStake: FakeStakeAbi,
	};

	const network = contractsAbi[contract].networks as Network;

	if (!network.hasOwnProperty(networkId)) {
		throw new Error(`Network ${networkId} not found`);
	}

	return network[networkId].address;
};

const listTokensOfOwner = async (
	contract: FakeNft,
	account: string,
): Promise<string[]> => {
	const sentLogs = await contract.queryFilter(
		contract.filters.Transfer(account, null),
	);

	const receivedLogs = await contract.queryFilter(
		contract.filters.Transfer(null, account),
	);

	const logs = sentLogs
		.concat(receivedLogs)
		.sort(
			(a, b) =>
				a.blockNumber - b.blockNumber ||
				a.transactionIndex - b.transactionIndex,
		);

	const owned = new Set<string>();

	for (const log of logs) {
		const { from, to, tokenId } = log.args as Result;

		if (addressEqual(to, account)) {
			owned.add(tokenId.toString());
		} else if (addressEqual(from, account)) {
			owned.delete(tokenId.toString());
		}
	}

	return Array.from(owned.values());
};

const addressEqual = (a: string, b: string) => {
	return a.toLowerCase() === b.toLowerCase();
};

export { getContractAddress, listTokensOfOwner };
