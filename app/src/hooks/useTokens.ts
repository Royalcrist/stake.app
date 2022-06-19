import { useToast } from '@chakra-ui/react';
import { GetAccountResult } from '@wagmi/core';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { FakeNft } from '../contracts';
import { listTokensOfOwner } from '../services/ContractService';

const useTokens = (
	account?: GetAccountResult<ethers.providers.BaseProvider>,
	contract?: FakeNft,
) => {
	const [isLoading, setIsLoading] = useState(true);
	const [tokens, setTokens] = useState<number[]>([]);
	const toast = useToast();

	const fetchTokens = useCallback(async () => {
		try {
			if (!account?.address || !contract) return;

			const tokens = await listTokensOfOwner(contract, account.address);

			setTokens(tokens);
			setIsLoading(false);
		} catch (error) {
			const parsedError = error as any;
			const message =
				parsedError?.data?.data?.reason ||
				'Something went wrong. Please try again.';

			toast({
				title: 'Failed to get your NFTs',
				description: message,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});

			setTokens([]);
			setIsLoading(false);
		}
	}, [account, contract, toast]);

	useEffect(() => {
		fetchTokens();
	}, [fetchTokens]);

	return { tokens, isLoading, fetchTokens };
};

export default useTokens;
