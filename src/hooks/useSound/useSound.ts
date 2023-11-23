import { HowlOptions } from "howler";
import { useState } from "react";
import { SoundCache } from "./soundCache";
import { Sound } from "./sound";

export function useSound(options: HowlOptions) {
    const [sound, setSound] = useState<Sound>(SoundCache.getSound(options));
    return [sound, setSound] as const;
}