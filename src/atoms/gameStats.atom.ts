import { atom } from "jotai";
import { GameStats } from "../types/game";

export const gameStatsAtom = atom({ profits: 0, losses: 0, profit: 0, salesVolume: 0 } as GameStats);