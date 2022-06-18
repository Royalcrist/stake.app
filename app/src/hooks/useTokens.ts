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

	const fetchTokens = useCallback(async () => {
		try {
			if (!account?.address || !contract) return;

			let tokens = await listTokensOfOwner(contract, account.address);

			setTokens(tokens);
			setIsLoading(false);
		} catch (error) {
			// TODO: Handle error
			setTokens([]);
			setIsLoading(false);
		}
	}, [account, contract]);

	useEffect(() => {
		fetchTokens();
	}, [fetchTokens]);

	return { tokens, isLoading, fetchTokens };
};

export default useTokens;
