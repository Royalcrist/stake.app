import { Result } from '@ethersproject/abi';
import { FakeNft, FakeStake } from '../contracts';
import FakeNftAbi from '../contracts/FakeNft.json';
import FakeCoinAbi from '../contracts/FakeCoin.json';
import FakeStakeAbi from '../contracts/FakeStake.json';
import { BigNumberish } from 'ethers';

// TODO: move to index.d.ts
type Network = { [key: string]: any };

interface FilterTransfersParams {
	receiver: string;
	sender?: string;
	tokenId?: BigNumberish;
}

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
): Promise<number[]> => {
	return filterFakeNftTransfers(contract, { receiver: account });
};

const listStakedTokensOfOwner = async (
	fakeNftContract: FakeNft,
	stakeContract: FakeStake,
	account: string,
): Promise<number[]> => {
	return filterFakeNftTransfers(fakeNftContract, {
		receiver: stakeContract.address,
		sender: account,
	});
};

const filterFakeNftTransfers = async (
	contract: FakeNft,
	{ receiver, sender, tokenId }: FilterTransfersParams,
) => {
	const sentLogs = await contract.queryFilter(
		contract.filters.Transfer(sender, receiver),
	);

	const receivedLogs = await contract.queryFilter(
		contract.filters.Transfer(receiver, sender),
	);

	const logs = sentLogs
		.concat(receivedLogs)
		.sort(
			(a, b) =>
				a.blockNumber - b.blockNumber ||
				a.transactionIndex - b.transactionIndex,
		);

	const owned = new Set<number>();

	logs.forEach(log => {
		const { from, to, tokenId } = log.args as Result;

		if (addressEqual(to, receiver)) {
			owned.add(tokenId.toString());
		} else if (addressEqual(from, receiver)) {
			owned.delete(tokenId.toString());
		}
	});

	return Array.from(owned.values());
};

const addressEqual = (a: string, b: string) => {
	return a.toLowerCase() === b.toLowerCase();
};

export { getContractAddress, listTokensOfOwner, listStakedTokensOfOwner };
