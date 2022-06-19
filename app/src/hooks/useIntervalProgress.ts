import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useEffect, useState } from 'react';

const useIntervalProgress = (interval?: number, compararedTime?: Dayjs) => {
	const [elapsedTime, setElapsedTime] = useState<Dayjs>();
	const [progress, setProgress] = useState<number>(0);

	// Get the progress of the update progress bar from 1 to 100 percent
	const getprogress = useCallback(
		(time: Dayjs): number => {
			if (!interval || !compararedTime) return 0;

			const elapsed = time.diff(compararedTime, 'millisecond');

			return 100 - Math.min(100, Math.floor((elapsed / interval) * 100));
		},
		[interval, compararedTime],
	);

	const updateTime = useCallback(() => {
		if (!compararedTime) return;

		const newTime = dayjs();

		setElapsedTime(newTime);
		setProgress(getprogress(newTime));
	}, [getprogress, compararedTime]);

	useEffect(() => {
		updateTime();

		const interval = setInterval(() => {
			updateTime();
		}, 100);

		return () => {
			clearInterval(interval);
		};
	}, [updateTime]);

	return { elapsedTime, progress };
};

export default useIntervalProgress;
