import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { FakeStake } from '../contracts';

const useClaim = (contract?: FakeStake) => {
	const [isClaiming, setIsClaiming] = useState(false);
	const toast = useToast();

	const claim = async () => {
		try {
			if (!contract) return;
			setIsClaiming(true);

			await contract.claim();

			setIsClaiming(false);

			toast({
				title: 'Claiming is processing',
				description: 'Your claim is in progress. Please wait.',
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
				title: 'Claim failed',
				description: message,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});

			setIsClaiming(false);
		}
	};

	return { isClaiming, claim };
};

export default useClaim;
