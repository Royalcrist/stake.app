import TokensList from '../components/data_display/TokensList';
import TokenItem from '../components/data_display_items/TokenItem';
import StakeStats from '../components/sections/StakeStats';
import LoadingContent from '../components/layouts/LoadingContent';
import ImageSection from '../components/sections/ImageSection';
import { useRouter } from 'next/router';
import { useAccount, useContractEvent, useProvider, useSigner } from 'wagmi';
import Navbar from '../components/layouts/Navbar';
import { getContractAddress } from '../services/ContractService';
import { FakeCoin__factory, FakeNft__factory } from '../contracts';
import { Box, Grid, GridItem, useToast } from '@chakra-ui/react';
import useTokens from '../hooks/useTokens';
import useContracts from '../hooks/useContracts';
import useMint from '../hooks/useMint';
import useStake from '../hooks/useStake';
import useClaim from '../hooks/useClaim';
import useWithdraw from '../hooks/useWithdraw';
import useIntervalProgress from '../hooks/useIntervalProgress';
import useContractNotifications from '../hooks/useContractNotifications';

const StakePage = () => {
	const { data: account } = useAccount();
	const { data: signer } = useSigner();

	const provider = useProvider();
	const networkId = provider.network.chainId;
	const fakeNftAddress = getContractAddress('FakeNft', networkId);
	const fakeStakeAddress = getContractAddress('FakeStake', networkId);
	const fakeCoinAddress = getContractAddress('FakeCoin', networkId);
	const { fakeNftContract, fakeStakeContract } = useContracts(
		{
			fakeNftAddress,
			fakeStakeAddress,
			fakeCoinAddress,
		},
		signer,
	);

	const {
		tokens,
		isLoading: tokensLoading,
		fetchTokens,
	} = useTokens(account, fakeNftContract);

	const { mint, isMinting } = useMint(account, fakeNftContract);

	const updateIntervalMs = 1000 * 15; // 15 seconds
	const {
		currentStakingToken,
		stake,
		getStakeInfo,
		reward,
		stakedTokens,
		lastUpdate,
	} = useStake({
		account,
		fakeStakeContract,
		fakeNftContract,
		updateIntervalMs,
	});

	const { claim, isClaiming } = useClaim(fakeStakeContract);

	const { isWithdrawing, withdraw } = useWithdraw(fakeStakeContract);

	const handleWithdraw = () => withdraw(stakedTokens);

	const router = useRouter();
	const handleDisconnect = () => {
		account?.connector?.disconnect();
		router.push('/');
	};

	const toast = useToast();

	const onTransfer = async () => {
		await fetchTokens();
		await getStakeInfo();
		toast({
			title: 'Transaction complete',
			description: 'The operation was successful',
			status: 'success',
			duration: 5000,
			isClosable: true,
		});
	};

	useContractNotifications({
		fakeCoin: {
			address: fakeCoinAddress,
			abi: FakeCoin__factory.abi,
			onTransfer,
		},
		fakeNft: {
			address: fakeNftAddress,
			abi: FakeNft__factory.abi,
			onTransfer,
		},
	});

	const { elapsedTime } = useIntervalProgress(updateIntervalMs, lastUpdate);

	return (
		account && (
			<Grid
				templateAreas='"navbar" "content"'
				templateColumns="1fr"
				templateRows="auto 1fr"
				height="100vh"
				overflow="hidden"
			>
				{account.address && (
					<Navbar accountId={account.address} onLogout={handleDisconnect} />
				)}
				{tokensLoading ? (
					<LoadingContent />
				) : (
					<Box position="relative">
						<Box
							position="absolute"
							top="0"
							left="0"
							right="0"
							bottom="0"
							overflow={{ base: 'auto', lg: 'hidden' }}
						>
							<Grid
								templateAreas={{
									base: '"stake" "tokens"',
									lg: '"stake tokens"',
								}}
								templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
								templateRows={{ base: 'auto 1fr', lg: '1fr' }}
								height="100%"
							>
								<GridItem
									area="stake"
									paddingTop={{
										base: 0,
										md: 20,
									}}
								>
									{stakedTokens.length > 0 ? (
										<StakeStats
											image="/backgrounds/profile/staked.png"
											alt="Stake image"
											reward={reward}
											rewardCurrency="FK"
											stakedTokens={stakedTokens.length}
											onClaim={claim}
											isClaiming={isClaiming}
											onWithdraw={handleWithdraw}
											isWithdrawing={isWithdrawing}
											lastUpdated={lastUpdate}
											elapsedTime={elapsedTime}
											updateIntervalMs={updateIntervalMs}
										/>
									) : (
										<ImageSection
											title="You have zero rewards"
											description="What are you waiting for?"
											image="/backgrounds/profile/zero-staked.png"
											imageAlt="Zero staked image"
										/>
									)}
								</GridItem>
								<GridItem area="tokens" position="relative">
									<Box
										position="absolute"
										top="0"
										left="0"
										right="0"
										bottom="0"
										overflow={{ base: 'inherit', lg: 'auto' }}
										padding={4}
										paddingTop={20}
									>
										<TokensList isMinting={isMinting} onMint={mint}>
											{tokens.map(tokenId => (
												<TokenItem
													key={`token-item-${tokenId}`}
													tokenId={tokenId}
													onClick={stake(tokenId)}
													isLoading={currentStakingToken == tokenId}
												/>
											))}
										</TokensList>
									</Box>
								</GridItem>
							</Grid>
						</Box>
					</Box>
				)}
			</Grid>
		)
	);
};

export default StakePage;
