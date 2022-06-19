import {
	Box,
	Button,
	Grid,
	Flex,
	Image,
	Text,
	Progress,
} from '@chakra-ui/react';
import dayjs, { Dayjs } from 'dayjs';

interface StakeStatsProps {
	image: string;
	stakedTokens: number;
	reward: string | number;
	rewardCurrency: string;
	alt?: string;
	lastUpdated?: Dayjs;
	elapsedTime?: Dayjs;
	isClaiming?: boolean;
	isWithdrawing?: boolean;
	onClaim?: () => void;
	onWithdraw?: () => void;
	updateIntervalMs?: number;
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
	elapsedTime,
	lastUpdated,
	updateIntervalMs,
}: StakeStatsProps) => {
	return (
		<Flex direction="column" alignItems="center" gap={4} padding={4}>
			<Image
				src={image}
				alt={alt}
				maxH={{
					base: '12em',
					lg: '20em',
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
			<Flex direction="column" w="100%" gap={2}>
				{elapsedTime && lastUpdated && updateIntervalMs ? (
					<Text
						fontSize="xs"
						textAlign="center"
						sx={{
							':first-letter': {
								textTransform: 'uppercase',
							},
						}}
					>
						Next update in{' '}
						{dayjs.duration(updateIntervalMs, 'millisecond').asSeconds() -
							elapsedTime.diff(lastUpdated, 'seconds')}{' '}
						seconds
					</Text>
				) : null}
			</Flex>
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
