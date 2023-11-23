import { HowlOptions } from "howler";
import { SoundFactory } from "./soundFactory";

export class Sound {
    private sound: Howl | null = null;
    constructor(private options: HowlOptions) { }

    play(muted = false) {
        if (this.sound === null) {
            this.sound = SoundFactory.getSound(this.options);
        }
        this.sound.mute(muted);
        this.sound.play();
    }
}