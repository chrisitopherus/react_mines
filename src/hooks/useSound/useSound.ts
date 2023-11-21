import { HowlOptions } from "howler";
import { useEffect, useState } from "react";
import { SoundCache } from "./soundCache";
import { Sound } from "./sound";

export function useSound(options: HowlOptions) {
    const [sound, setSound] = useState<Sound>(SoundCache.getSound(options));

    useEffect(() => {
        if (!sound) {
            setSound(SoundCache.getSound(options));
        }

        console.debug("useEffect:", "triggered in useSound");
    }, [options, sound]);

    return [sound];
}