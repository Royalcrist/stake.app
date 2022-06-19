import { useEffect, useState } from 'react';
import {
	FakeCoin__factory,
	FakeNft__factory,
	FakeStake__factory,
} from '../../contracts';
import { Contracts, UseContractsProps } from './types';

const useContracts: UseContractsProps = (addresses, signer) => {
	const [contracts, setContracts] = useState<Contracts>({});
	const { fakeNftAddress, fakeStakeAddress, fakeCoinAddress } = addresses;

	useEffect(() => {
		if (!signer) return;

		const newContracts: Contracts = {};

		if (fakeNftAddress) {
			const fakeNftContract = FakeNft__factory.connect(fakeNftAddress, signer);
			newContracts.fakeNftContract = fakeNftContract;
		}

		if (fakeStakeAddress) {
			const fakeStakeContract = FakeStake__factory.connect(
				fakeStakeAddress,
				signer,
			);
			newContracts.fakeStakeContract = fakeStakeContract;
		}

		if (fakeCoinAddress) {
			const fakeCoinContract = FakeCoin__factory.connect(
				fakeCoinAddress,
				signer,
			);
			newContracts.fakeCoinContract = fakeCoinContract;
		}

		setContracts(newContracts);
	}, [fakeCoinAddress, fakeNftAddress, fakeStakeAddress, signer]);

	return contracts;
};

export default useContracts;
