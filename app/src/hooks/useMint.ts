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
				title: 'Minting in processing',
				description:
					'Your token is minting, it will appear in your list after being approve.',
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
