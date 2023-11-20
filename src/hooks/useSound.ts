import { HowlOptions } from "howler";
import { SoundFactory } from "./soundFactory";
import { useEffect, useState } from "react";

class Sound {
    constructor(private options: HowlOptions) { }

    play(muted = false) {
        if (muted) return;
        const sound = SoundFactory.getSound(this.options);
        sound.play();
    }
}

class SoundCache {
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

export default function useSound(options: HowlOptions) {
    const [sound, setSound] = useState<Sound>(SoundCache.getSound(options));

    useEffect(() => {
        if (!sound) {
            setSound(SoundCache.getSound(options));
        }

        console.debug("useEffect:", "triggered in useSound");
    }, [options, sound]);

    return [sound];
}