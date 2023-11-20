import { atom } from "jotai";

export interface GameStats {
    profits: number;
    losses: number;
    profit: number;
    salesVolume: number;
}

export const gameStatsAtom = atom({ profits: 0, losses: 0, profit: 0, salesVolume: 0 } as GameStats);