import { useState } from 'react';
import { GetAccountResult } from '@wagmi/core';
import { ethers } from 'ethers';
import { FakeNft } from '../contracts';
import { useToast } from '@chakra-ui/react';

const useMint = (
	account?: GetAccountResult<ethers.providers.BaseProvider>,
	fakeNftContract?: FakeNft,
) => {
	const [isMinting, setIsMinting] = useState(false);
	const toast = useToast();

	const mint = async () => {
		try {
			if (!account?.address || !fakeNftContract) return;

			setIsMinting(true);

			await fakeNftContract.mint(account.address);

			setIsMinting(false);

			toast({
				title: 'Withdraw in processing',
				description: 'Your withdraw is in progress. Please wait.',
				status: 'info',
				duration: 9000,
				isClosable: true,
			});

			// TODO: Add event listener to check if mint is done.
		} catch (error) {
			const parsedError = error as any;
			const message =
				parsedError?.data?.data?.reason ||
				'Something went wrong. Please try again.';

			toast({
				title: 'Mint failed',
				description: message,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});

			setIsMinting(false);
		}
	};

	return { isMinting, mint };
};
export default useMint;
