import { useState } from 'react';
import { FakeStake } from '../contracts';

const useClaim = (contract?: FakeStake) => {
	const [isClaiming, setIsClaiming] = useState(false);

	const claim = async () => {
		try {
			if (!contract) return;
			setIsClaiming(true);

			await (await contract.claim()).wait();

			setIsClaiming(false);
		} catch (error) {
			// TODO: Handle the error
			console.log(error);
		}
	};

	return { isClaiming, claim };
};

export default useClaim;
