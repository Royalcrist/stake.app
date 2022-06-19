import { FakeStake } from '../../contracts';
import { FakeNft } from '../../contracts';
export interface UseStakeProps {
	account?: GetAccountResult<ethers.providers.BaseProvider>;
	fakeStakeContract?: FakeStake;
	fakeNftContract?: FakeNft;
	updateIntervalMs: number;
}
