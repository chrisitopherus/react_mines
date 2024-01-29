import { useState, useEffect, Dispatch, SetStateAction, useMemo } from "react";
import { ProgressTimer } from "./progressTimer";

export function useProgressTimer(isRoundActive: boolean, setIsRoundActive: Dispatch<SetStateAction<boolean>>, onCompletion: () => void, options: { seconds: number, frequency: number }) {
    const [progress, setProgress] = useState(0);
    const progressTimer = useMemo(() => new ProgressTimer(setProgress, setIsRoundActive, onCompletion), [onCompletion, setIsRoundActive]);
    const totalUpdates = (options.seconds * 1000) / options.frequency;
    const step = 100 / totalUpdates;

    useEffect(() => {
        let timer: number;
        let finished = false;
        if (isRoundActive) {
            timer = setInterval(() => {
                setProgress(oldProgress => {
                    if (oldProgress >= 100) {
                        finished = true;
                        return 100;
                    } else {
                        return Math.min(oldProgress + step, 100);
                    }
                });

                if (finished) {
                    clearInterval(timer);
                    progressTimer.finish();
                    return 0;
                }
            }, options.frequency);
        }

        return () => clearInterval(timer);
    }, [isRoundActive]);

    return { progressTimer, progress, setProgress };
}