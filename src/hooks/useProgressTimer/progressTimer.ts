import { Dispatch, SetStateAction } from "react";

export class ProgressTimer {
    constructor(private setProgress: Dispatch<SetStateAction<number>>, private setIsRoundActive: Dispatch<SetStateAction<boolean>>, private finishedHandler: () => void) {

    }

    stop() {
        this.setIsRoundActive(false);
        this.reset();
    }

    reset() {
        this.setProgress(0);
    }

    start() {
        this.reset();
        this.setIsRoundActive(true);
    }

    finish() {
        this.finishedHandler();
    }
}