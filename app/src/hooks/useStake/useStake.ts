import { useToast } from '@chakra-ui/react';
import Big from 'big.js';
import dayjs, { Dayjs } from 'dayjs';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { listStakedTokensOfOwner } from '../../services/ContractService';
import { UseStakeProps } from './types';

const useStake = ({
	account,
	fakeStakeContract,
	fakeNftContract,
	updateIntervalMs,
}: UseStakeProps) => {
	const [stakedTokens, setStakedTokens] = useState<number[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentStakingToken, setCurrentStakingToken] = useState<
		number | undefined
	>();
	const [reward, setReward] = useState<string>('0');
	const [lastUpdate, setLastUpdate] = useState<Dayjs>();
	const toast = useToast();

	const stake = (tokenId: number) => async () => {
		try {
			if (!account?.address || !fakeStakeContract || !fakeNftContract) return;

			setCurrentStakingToken(tokenId);

			toast({
				title: 'Please, dont close this window',
				description: 'We are approving your token to be staked',
				status: 'info',
				duration: 5000,
				isClosable: true,
			});

			await (
				await fakeNftContract.approve(fakeStakeContract.address, tokenId)
			).wait();

			await fakeStakeContract.stake([tokenId], {
				from: account.address,
			});

			setCurrentStakingToken(undefined);

			toast({
				title: 'Your token is processed',
				description: 'Once approved, it will be staked',
				status: 'info',
				duration: 5000,
				isClosable: true,
			});
		} catch (error: any) {
			const parsedError = error as any;
			const message =
				parsedError?.data?.data?.reason ||
				'Something went wrong. Please try again.';

			toast({
				title: 'Stake failed',
				description: message,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});

			setCurrentStakingToken(undefined);
		}
	};

	const getStakeInfo = useCallback(async () => {
		try {
			if (!account?.address || !fakeNftContract || !fakeStakeContract) return;

			const tokens = await listStakedTokensOfOwner(
				fakeNftContract,
				fakeStakeContract,
				account.address,
			);
			setStakedTokens(tokens);

			const info = await fakeStakeContract.info(account.address);
			const reward = Big(
				ethers.utils.formatEther(info._availableRewards),
			).toFixed();
			setReward(reward);

			setIsLoading(false);
		} catch (error) {
			const parsedError = error as any;
			const message =
				parsedError?.data?.data?.reason ||
				'Something went wrong. Please try again.';

			// Making logs because the alert is annoying.
			console.log(message);
		}
	}, [account, fakeNftContract, fakeStakeContract]);

	const updateStakeInfo = useCallback(async () => {
		getStakeInfo();
		setLastUpdate(dayjs());
	}, [getStakeInfo]);

	useEffect(() => {
		updateStakeInfo();

		const infoInterval = setInterval(() => {
			updateStakeInfo();
		}, updateIntervalMs); // every minute

		return () => {
			clearInterval(infoInterval);
		};
	}, [updateIntervalMs, updateStakeInfo]);

	return {
		currentStakingToken,
		stake,
		reward,
		getStakeInfo,
		stakedTokens,
		isLoading,
		lastUpdate,
	};
};
export default useStake;
