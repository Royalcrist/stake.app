import { Box, Button, Grid, Flex, Image, Text } from '@chakra-ui/react';
import Big from 'big.js';

interface StakeStatsProps {
	image: string;
	stakedTokens: number;
	reward: string | number;
	rewardCurrency: string;
	alt?: string;
	onClaim?: () => void;
	onWithdraw?: () => void;
	isClaiming?: boolean;
	isWithdrawing?: boolean;
}

const StakeStats = ({
	image,
	stakedTokens,
	reward,
	rewardCurrency,
	alt,
	onClaim,
	onWithdraw,
	isClaiming,
	isWithdrawing,
}: StakeStatsProps) => {
	return (
		<Flex direction="column" alignItems="center" gap={4} padding={4}>
			<Image
				src={image}
				alt={alt}
				maxH={{
					base: '12em',
				}}
			/>
			<Grid
				templateAreas={{
					base: '"staked" "reward"',
					sm: '"staked reward"',
				}}
				templateColumns={{
					base: '1fr',
					sm: 'minmax(12rem, min-content) auto minmax(12rem, min-content)',
				}}
				templateRows={{
					base: '1fr 1fr',
					sm: '1fr',
				}}
				width="100%"
				gap={4}
				justifyContent="center"
			>
				<Flex direction="column" alignItems="center" paddingX={8}>
					<Text fontSize="sm">Staked</Text>
					<Text color="font.900" fontSize="3xl" fontWeight="bold">
						{stakedTokens}
					</Text>
				</Flex>
				<Box
					width="1px"
					height="100%"
					bg="font.50"
					display={{ base: 'none', sm: 'initial' }}
				/>
				{/* TODO: show the time elapsed since the last get info */}
				<Flex direction="column" alignItems="center" paddingX={8}>
					<Text fontSize="sm">Reward</Text>
					<Flex direction="row" alignItems="baseline" gap={2}>
						<Text color="font.900" fontSize="3xl" fontWeight="bold">
							{reward}
						</Text>
						<Text color="secondary.900" fontSize="3xl" fontWeight="bold">
							{rewardCurrency}
						</Text>
					</Flex>
				</Flex>
			</Grid>
			<Flex direction="row" gap={4} marginTop={4}>
				<Button onClick={onClaim} isLoading={isClaiming}>
					Claim
				</Button>
				<Button variant="danger" onClick={onWithdraw} isLoading={isWithdrawing}>
					Withdraw
				</Button>
			</Flex>
		</Flex>
	);
};

export default StakeStats;
