import { HowlOptions, Howl } from "howler";

export class SoundFactory {
    static soundCache = new Map<string, Howl>();

    static getSound(options: HowlOptions) {
        const key = JSON.stringify(options.src);
        if (!this.soundCache.has(key)) {
            this.soundCache.set(key, new Howl(options));
        }

        const sound = this.soundCache.get(key);
        if (!sound) throw new Error("Could not get sound.");
        return sound;
    }
}