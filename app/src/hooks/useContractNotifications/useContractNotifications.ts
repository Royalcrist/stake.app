import { useContractEvent } from 'wagmi';
import { UseContractNotifications } from './types';

const useContractNotifications: UseContractNotifications = ({
	fakeCoin,
	fakeNft,
}) => {
	useContractEvent(
		{
			addressOrName: fakeNft.address,
			contractInterface: fakeNft.abi,
		},
		'Transfer',
		fakeNft.onTransfer,
	);

	useContractEvent(
		{
			addressOrName: fakeCoin.address,
			contractInterface: fakeCoin.abi,
		},
		'Transfer',
		fakeCoin.onTransfer,
	);
};

export default useContractNotifications;
