import { useState } from 'react';
import { FakeStake } from '../contracts';

const useWithdraw = (contract?: FakeStake) => {
	const [isWithdrawing, setIsWithdrawing] = useState(false);

	const withdraw = async (stakedTokens: number[]) => {
		try {
			if (!contract) return;

			setIsWithdrawing(true);

			await contract.withdraw(stakedTokens);

			setIsWithdrawing(false);

			// TODO: use a toast to show the user that the withdraw was successful
		} catch (error) {
			// TODO handle the error
		}
	};

	return { isWithdrawing, withdraw };
};

export default useWithdraw;
