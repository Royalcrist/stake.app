import { FakeNft } from '../../contracts';
import { FakeStake } from '../../contracts';
import { FakeCoin } from '../../contracts';

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
