const fakeStake = artifacts.require('FakeStake');
const fakeCoin = artifacts.require('FakeCoin');
const fakeNft = artifacts.require('FakeNft');

contract('FakeStake', accounts => {
	it('should stake', async () => {
		const fakecoinInstance = await fakeCoin.deployed();
		const fakeNftInstance = await fakeNft.deployed();
		const fakeStakeInstance = await fakeStake.deployed();

		await fakecoinInstance.transfer(
			fakeStakeInstance.address,
			'9000000000000000000000',
		);

		await fakeNftInstance.mint(accounts[0]);

		await fakeNftInstance.approve(fakeStakeInstance.address, [0]);

		await fakeStakeInstance.stake([0], { from: accounts[0] });

		let balance = await fakeStakeInstance.info(accounts[0]);

		assert.equal(balance._tokensStaked.length, 1);
	});
});
