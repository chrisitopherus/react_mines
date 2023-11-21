import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { ProgressTimer } from './progressTimer';

export function useProgressTimer(isRoundActive: boolean, setIsRoundActive: Dispatch<SetStateAction<boolean>>) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let timer: number;
        if (isRoundActive) {
            timer = setInterval(() => {
                setProgress(oldProgress => oldProgress >= 100 ? 100 : oldProgress + 0.1);
            }, 10);
        }

        return () => clearInterval(timer);
    }, [isRoundActive]);

    return { progressTimer: new ProgressTimer(setProgress, setIsRoundActive), progress, setProgress };
}