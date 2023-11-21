import { Dispatch, SetStateAction } from "react";

export class ProgressTimer {
    constructor(private setProgress: Dispatch<SetStateAction<number>>, private setIsRoundActive: Dispatch<SetStateAction<boolean>>) {

    }
    stop() {
        this.setIsRoundActive(false);
    }

    reset() {
        this.setProgress(0);
    }

    start() {
        this.setIsRoundActive(true);
        this.setProgress(0);
    }
}