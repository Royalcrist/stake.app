var fakeCoin = artifacts.require('FakeCoin');
var fakeNft = artifacts.require('FakeNft');
var fakeStake = artifacts.require('FakeStake');

module.exports = async function(deployer) {
    await deployer.deploy(fakeCoin, 100000);
    await fakeCoin.deployed();

    await deployer.deploy(fakeNft);
    await fakeNft.deployed();
};