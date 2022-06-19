import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { FakeStake } from '../contracts';

const useWithdraw = (contract?: FakeStake) => {
	const [isWithdrawing, setIsWithdrawing] = useState(false);
	const toast = useToast();

	const withdraw = async (stakedTokens: number[]) => {
		try {
			if (!contract) return;

			setIsWithdrawing(true);

			await contract.withdraw(stakedTokens);

			setIsWithdrawing(false);

			toast({
				title: 'Withdraw in processing',
				description: 'Your withdraw is in progress. Please wait.',
				status: 'info',
				duration: 9000,
				isClosable: true,
			});
		} catch (error) {
			const parsedError = error as any;
			const message =
				parsedError?.data?.data?.reason ||
				'Something went wrong. Please try again.';

			toast({
				title: 'Withdraw failed',
				description: message,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});

			setIsWithdrawing(false);
		}
	};

	return { isWithdrawing, withdraw };
};

export default useWithdraw;
