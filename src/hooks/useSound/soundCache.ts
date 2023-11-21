import { HowlOptions } from "howler";
import { Sound } from "./sound";

export class SoundCache {
    static cache = new Map<string, Sound>();

    static getSound(options: HowlOptions) {
        const key = JSON.stringify(options.src);
        if (!this.cache.has(key)) {
            this.cache.set(key, new Sound(options));
        }

        const sound = SoundCache.cache.get(key);
        if (!sound) throw new Error("Could not get sound.");
        return sound;
    }
}