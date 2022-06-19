import { ContractInterface } from 'ethers';
import { useContractEvent } from 'wagmi';

interface Contract {
	address: string;
	abi: ContractInterface;
	onTransfer: () => void;
}

interface ContractListeners {
	fakeCoin: Contract;
	fakeNft: Contract;
}

type UseContractNotifications = (listeners: ContractListeners) => void;

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
