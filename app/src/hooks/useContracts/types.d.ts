interface Contracts {
	fakeNftContract?: FakeNft;
	fakeStakeContract?: FakeStake;
	fakeCoinContract?: FakeCoin;
}

interface ContractsAddresses {
	fakeNftAddress?: string;
	fakeStakeAddress?: string;
	fakeCoinAddress?: string;
}

type UseContractsProps = (
	addresses: ContractsAddresses,
	signer?: FetchSignerResult,
) => Contracts;

export { UseContractsProps, Contracts };
