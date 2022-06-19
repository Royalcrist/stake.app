import { Dayjs } from 'dayjs';

export interface StakeStatsProps {
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
