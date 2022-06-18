import { useState } from 'react';
import { GetAccountResult } from '@wagmi/core';
import { ethers } from 'ethers';
import { FakeNft } from '../contracts';

const useMint = (
	account?: GetAccountResult<ethers.providers.BaseProvider>,
	fakeNftContract?: FakeNft,
) => {
	const [isMinting, setIsMinting] = useState(false);

	const mint = async () => {
		try {
			if (!account?.address || !fakeNftContract) return;

			setIsMinting(true);

			await fakeNftContract.mint(account.address);

			setIsMinting(false);
		} catch (error) {
			// TODO: Handle the error
		}
	};

	return { isMinting, mint };
};
export default useMint;
