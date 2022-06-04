// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./FakeCoin.sol";
import "./FakeNft.sol";

contract FakeStake is Ownable, ReentrancyGuard {
    FakeCoin public immutable rewardsToken;
    FakeNft public immutable nftCollection;

    struct Staker {
        uint256 amountStaked;
        uint256 timeOfLastUpdate;
        uint256 unclaimedRewards;
    }

    uint256 private rewardsPerSecond = 10e18;

    mapping(address => Staker) public stakers;
    mapping(uint256 => address) public stakerAddress;

    constructor(FakeNft _nftCollection, FakeCoin _rewardsToken) {
        nftCollection = _nftCollection;
        rewardsToken = _rewardsToken;
    }

    function stake(uint256[] calldata _tokenIds) external nonReentrant {
        if (stakers[msg.sender].amountStaked > 0) {
            uint256 rewards = calculateRewards(msg.sender);
            stakers[msg.sender].unclaimedRewards += rewards;
        }

        uint256 len = _tokenIds.length;

        for (uint256 i; i < len; ++i) {
            require(
                nftCollection.ownerOf(_tokenIds[i]) == msg.sender,
                "Can't stake tokens you don't own!"
            );

            nftCollection.transferFrom(msg.sender, address(this), _tokenIds[i]);
            stakerAddress[_tokenIds[i]] = msg.sender;
        }

        stakers[msg.sender].amountStaked += len;
        stakers[msg.sender].timeOfLastUpdate = block.timestamp;
    }

    function withdraw(uint256[] calldata _tokenIds) external nonReentrant {
        require(
            stakers[msg.sender].amountStaked > 0,
            "You have no tokens staked"
        );

        uint256 rewards = calculateRewards(msg.sender);

        stakers[msg.sender].unclaimedRewards += rewards;

        uint256 len = _tokenIds.length;

        for (uint256 i; i < len; ++i) {
            require(
                stakerAddress[_tokenIds[i]] == msg.sender,
                "This token is not staked by this sender"
            );

            stakerAddress[_tokenIds[i]] = address(0);

            nftCollection.transferFrom(address(this), msg.sender, _tokenIds[i]);
        }

        stakers[msg.sender].amountStaked -= len;
        stakers[msg.sender].timeOfLastUpdate = block.timestamp;
    }

    function claim() external {
        uint256 rewards = calculateRewards(msg.sender) + stakers[msg.sender].unclaimedRewards;

        require(rewards > 0, "You have no rewards to claim");

        stakers[msg.sender].timeOfLastUpdate = block.timestamp;
        stakers[msg.sender].unclaimedRewards = 0;

        rewardsToken.transfer(msg.sender, rewards);
    }

    function info(address _user)
    public
    view
    returns (uint256 _tokensStaked, uint256 _availableRewards)
    {
        return (stakers[_user].amountStaked, availableRewards(_user));
    }

    function availableRewards(address _user)
    internal
    view
    returns (uint256) {
        require(stakers[_user].amountStaked > 0, "User has no tokens staked");

        return stakers[_user].unclaimedRewards + calculateRewards(_user);
    }

    function calculateRewards(address _staker)
    internal
    view
    returns (uint256 _rewards)
    {
        uint256 secondsElapsed = block.timestamp - stakers[_staker].timeOfLastUpdate;

        return secondsElapsed * stakers[msg.sender].amountStaked * rewardsPerSecond;
    }
}