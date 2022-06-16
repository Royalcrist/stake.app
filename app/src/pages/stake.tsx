import StakeStats from './../components/layout/StakeStats';
import LoadingContent from './../components/layout/LoadingContent';
import ImageSection from './../components/layout/ImageSection';
import { useRouter } from 'next/router';
import { useEffect, useCallback, useState } from 'react';
import {
	useAccount,
	useContractEvent,
	useEnsName,
	useProvider,
	useSigner,
} from 'wagmi';
import Navbar from '../components/layout/Navbar';
import {
	listTokensOfOwner,
	getContractAddress,
} from '../services/ContractService';
import { FakeNft__factory, FakeStake__factory } from '../contracts';
import {
	Box,
	Button,
	Flex,
	Grid,
	Heading,
	Image,
	Spinner,
	Text,
	useToast,
} from '@chakra-ui/react';
import Big from 'big.js';
import { ethers, BigNumber } from 'ethers';

const StakePage = () => {
	const { data: account } = useAccount();
	const { data: signer } = useSigner();
	const { data: ensName } = useEnsName({ address: account?.address });
	const router = useRouter();

	const handleDisconnect = () => {
		account?.connector?.disconnect();
		router.push('/');
	};

	const provider = useProvider();
	const networkId = provider.network.chainId;
	const fakeNftAddress = getContractAddress('FakeNft', networkId);
	const [tokensLoading, setTokensLoading] = useState(true);
	const [tokens, setTokens] = useState<number[]>([]);

	const fetchTokens = useCallback(async () => {
		if (!account?.address) return;

		let tokens = await listTokensOfOwner(
			FakeNft__factory.connect(fakeNftAddress, provider),
			account.address,
		);

		setTokens(tokens);
		setTokensLoading(false);
	}, [account, fakeNftAddress, provider]);

	useEffect(() => {
		fetchTokens();
	}, [fetchTokens]);

	const [isMinting, setIsMinting] = useState(false);

	const mint = async () => {
		if (!account?.address || !signer) return;

		setIsMinting(true);

		let contract = FakeNft__factory.connect(fakeNftAddress, signer);

		// TODO: Use the block hash to manage the different transactions
		await contract.mint(account.address);

		setIsMinting(false);
	};

	const toast = useToast();
	const onMintingComplete = async () => {
		await fetchTokens();
		toast({
			title: 'Minting complete',
			description: 'Your token has been minted',
			status: 'success',
			duration: 5000,
			isClosable: true,
		});
	};

	useContractEvent(
		{
			addressOrName: fakeNftAddress,
			contractInterface: FakeNft__factory.abi,
		},
		'Transfer',
		onMintingComplete,
	);

	const [tokensScrollProgress, setTokensScrollProgress] = useState<number>(10);
	const fakeStakeAddress = getContractAddress('FakeStake', networkId);
	const [currentStakingToken, setCurrentStakingToken] = useState<
		number | undefined
	>();
	const stake = (tokenId: number) => async () => {
		try {
			if (!account?.address || !signer) return;

			setCurrentStakingToken(tokenId);

			const fakeNftContract = FakeNft__factory.connect(fakeNftAddress, signer);
			const fakeStakeContract = FakeStake__factory.connect(
				fakeStakeAddress,
				signer,
			);

			await (await fakeNftContract.approve(fakeStakeAddress, tokenId)).wait();

			await fakeStakeContract.stake([tokenId], {
				from: account.address,
			});

			setCurrentStakingToken(undefined);
		} catch (error: any) {
			setCurrentStakingToken(undefined);
			console.log(error?.stack);
		}
	};

	const [totalStaked, setTotalStaked] = useState<number>(0);
	const [reward, setReward] = useState<string>('0');

	const getStakeInfo = useCallback(async () => {
		if (!account?.address || !signer) return;
		const contract = FakeStake__factory.connect(fakeStakeAddress, signer);

		const info = await contract.info(account.address);

		console.log(ethers.utils.formatEther(info[1]));

		const reward = ethers.utils.formatEther(info._availableRewards);
		setReward(reward);

		const totalStakedWei = ethers.utils.formatEther(info._tokensStaked);
		const totalStaked = Big(totalStakedWei).mul('1e18').toNumber();

		setTotalStaked(totalStaked);
	}, [account, fakeStakeAddress, signer]);

	// TODO: show the time elapsed since the last get info
	useEffect(() => {
		getStakeInfo();
		const infoInterval = setInterval(() => {
			getStakeInfo();
		}, 60 * 1000); // every minute

		return () => {
			clearInterval(infoInterval);
		};
	}, [getStakeInfo]);

	const [isClaiming, setIsClaiming] = useState(false);

	const claimReward = async () => {
		if (!account?.address || !signer) return;
		setIsClaiming(true);

		const contract = FakeStake__factory.connect(fakeStakeAddress, signer);

		await (await contract.claim()).wait();

		setIsClaiming(false);
	};

	const [isWithdrawing, setIsWithdrawing] = useState(false);

	const withdraw = async () => {
		if (!account?.address || !signer) return;

		setIsWithdrawing(true);

		const contract = FakeStake__factory.connect(fakeStakeAddress, signer);

		// await (await contract.withdraw()).wait();

		setIsWithdrawing(false);
	};

	return (
		account && (
			<Grid
				templateAreas={{
					base: '"navbar" "content"',
				}}
				templateColumns={{ base: '1fr' }}
				templateRows={{ base: 'auto 1fr' }}
				height="100vh"
			>
				{account.address && (
					<Navbar accountId={account.address} onLogout={handleDisconnect} />
				)}
				{tokensLoading ? (
					<LoadingContent />
				) : (
					<>
						{/* TODO: Connect staked tokens and modify this */}
						{totalStaked > 0 ? (
							<StakeStats
								image="/backgrounds/profile/staked.png"
								alt="Stake image"
								reward={reward}
								rewardCurrency="FK"
								stakedTokens={totalStaked}
								onClaim={claimReward}
								isClaiming={isClaiming}
							/>
						) : (
							<ImageSection
								title="You have zero rewards"
								description="What are you waiting for?"
								image="/backgrounds/profile/zero-staked.png"
								imageAlt="Zero staked image"
								buttonText="Let's stake!"
							/>
						)}
						<Box marginTop={20} padding={4}>
							<Flex
								direction="column"
								align="center"
								gap={10}
								paddingTop={12}
								paddingX={4}
								paddingBottom={16}
								width="100%"
								backgroundColor="backgrounds.secondary.900"
								borderRadius={40}
								position="relative"
							>
								<Box
									backgroundColor="backgrounds.secondary.900"
									boxSize={20}
									borderRadius={400}
									position="absolute"
									top={-4}
								></Box>
								<Box
									backgroundColor="font.100"
									boxSize={2}
									position="absolute"
									borderRadius={400}
									top={-2}
								/>
								<Button
									variant="outline"
									width="100%"
									onClick={mint}
									isLoading={isMinting}
								>
									Buy NFT
								</Button>
								{tokens.length > 0 && (
									<>
										<Flex
											direction="row"
											alignItems="center"
											width="100%"
											position="relative"
										>
											<Box
												backgroundColor="font.50"
												width="100%"
												height={0.25}
												borderRadius={10}
											/>
											<Box
												backgroundColor="secondary.900"
												width={tokensScrollProgress + '%'}
												height={0.5}
												borderRadius={10}
												position="absolute"
												left={0}
												top="50%"
												transform="translateY(-50%)"
											/>
										</Flex>

										<Flex direction="column" gap={4} width="100%">
											{tokens.map(tokenId => (
												<Flex
													key={`token-item-${tokenId}`}
													direction="row"
													alignItems="center"
													justifyContent="space-between"
													padding={4}
													paddingLeft={8}
													borderRadius="3xl"
													bg="backgrounds.primary.900"
												>
													<Heading size="sm">Token {tokenId}</Heading>
													<Button
														variant="outline"
														size="xs"
														onClick={stake(tokenId)}
														isLoading={currentStakingToken == tokenId}
													>
														Stake
													</Button>
												</Flex>
											))}
										</Flex>
									</>
								)}
							</Flex>
						</Box>
					</>
				)}
			</Grid>
		)
	);
};

export default StakePage;
