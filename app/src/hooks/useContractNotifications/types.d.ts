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

export { UseContractNotifications };
