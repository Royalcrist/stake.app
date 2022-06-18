import { GetAccountResult } from '@wagmi/core';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { FakeNft, FakeStake } from '../contracts';
import { listStakedTokensOfOwner } from '../services/ContractService';

const useStake = (
	account?: GetAccountResult<ethers.providers.BaseProvider>,
	fakeStakeContract?: FakeStake,
	fakeNftContract?: FakeNft,
) => {
	const [stakedTokens, setStakedTokens] = useState<number[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentStakingToken, setCurrentStakingToken] = useState<
		number | undefined
	>();
	const [reward, setReward] = useState<string>('0');

	const fetchStakedTokens = useCallback(async () => {
		try {
			if (!account?.address || !fakeNftContract || !fakeStakeContract) return;

			const tokens = await listStakedTokensOfOwner(
				fakeNftContract,
				fakeStakeContract,
				account.address,
			);

			setStakedTokens(tokens);
			setIsLoading(false);
		} catch (error) {
			// Handle error
		}
	}, [account, fakeNftContract, fakeStakeContract]);

	useEffect(() => {
		fetchStakedTokens();
	}, [fetchStakedTokens]);

	const stake = (tokenId: number) => async () => {
		try {
			if (!account?.address || !fakeStakeContract || !fakeNftContract) return;

			setCurrentStakingToken(tokenId);

			await (
				await fakeNftContract.approve(fakeStakeContract.address, tokenId)
			).wait();

			await fakeStakeContract.stake([tokenId], {
				from: account.address,
			});

			setCurrentStakingToken(undefined);
		} catch (error: any) {
			// TODO: Handle error
			setCurrentStakingToken(undefined);
		}
	};

	const getStakeInfo = useCallback(async () => {
		try {
			if (!account?.address || !fakeStakeContract) return;

			const info = await fakeStakeContract.info(account.address);

			const reward = ethers.utils.formatEther(info._availableRewards);
			setReward(reward);
		} catch (error) {
			// TODO: Handle error
		}
	}, [account, fakeStakeContract]);

	useEffect(() => {
		getStakeInfo();
		const infoInterval = setInterval(() => {
			getStakeInfo();
		}, 60 * 1000); // every minute

		return () => {
			clearInterval(infoInterval);
		};
	}, [getStakeInfo]);

	return {
		currentStakingToken,
		stake,
		reward,
		getStakeInfo,
		stakedTokens,
		isLoading,
	};
};
export default useStake;
