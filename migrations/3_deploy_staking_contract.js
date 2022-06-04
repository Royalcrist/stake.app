var fakeCoin = artifacts.require('FakeCoin');
var fakeNft = artifacts.require('FakeNft');
var fakeStake = artifacts.require('FakeStake');

module.exports = async function(deployer) {
    let fakeCoinInstance = await fakeCoin.deployed();
    await fakeNft.deployed();

    await deployer.deploy(fakeStake, fakeNft.address, fakeCoin.address)
    await fakeStake.deployed();

    // fund rewards
    await fakeCoinInstance.transfer(fakeStake.address, "9000000000000000000000")
};