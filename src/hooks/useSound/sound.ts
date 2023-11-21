import { HowlOptions } from "howler";
import { SoundFactory } from "./soundFactory";

export class Sound {
    constructor(private options: HowlOptions) { }

    play(muted = false) {
        if (muted) return;
        const sound = SoundFactory.getSound(this.options);
        sound.play();
    }
}