export interface UseStakeProps {
	account?: GetAccountResult<ethers.providers.BaseProvider>;
	fakeStakeContract?: FakeStake;
	fakeNftContract?: FakeNft;
	updateIntervalMs: number;
}
