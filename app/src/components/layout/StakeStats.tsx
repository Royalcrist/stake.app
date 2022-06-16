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
				}}
				templateColumns={{
					base: '1fr',
				}}
				templateRows={{
					base: '1fr 1fr',
				}}
				width="100%"
				gap={4}
			>
				<Flex direction="column" alignItems="center" paddingX={4}>
					<Text fontSize="sm">Staked</Text>
					<Text color="font.900" fontSize="3xl" fontWeight="bold">
						{stakedTokens}
					</Text>
				</Flex>
				<Flex direction="column" alignItems="center" paddingX={4}>
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
