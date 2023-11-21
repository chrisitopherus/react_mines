import { useAtom } from "jotai";
import { gridSizeAtom } from "../../atoms/gridSize.atom";
import { capitalAtom } from "../../atoms/capital.atom";
import { mineAmountAtom } from "../../atoms/mineAmount.atom";
import { betAtom } from "../../atoms/bet.atom";
import { currentMultiplierAtom } from "../../atoms/currentMultiplier.atom";
import { gameStatsAtom } from "../../atoms/gameStats.atom";
import { gameOverAtom } from "../../atoms/gameOver.atom";
import { useEffect, useMemo, useState } from "react";
import { FieldGenerationService } from "../../services/fieldGenerationService";
import { GameService } from "../../services/gameService";

export function useGameState() {
    const fieldService = useMemo<FieldGenerationService>(() => new FieldGenerationService(), []);
    const [gridSize, setGridSize] = useAtom(gridSizeAtom);
    const [capital, setCapital] = useAtom(capitalAtom);
    const [mineAmount, setMineAmount] = useAtom(mineAmountAtom);
    const gameService = useMemo<GameService>(() => new GameService(gridSize ** 2, mineAmount), [gridSize, mineAmount]);
    const [bet, setBet] = useAtom(betAtom);
    const [currentMultiplier, setCurrentMultiplier] = useAtom(currentMultiplierAtom);
    const [gameStats, setGameStats] = useAtom(gameStatsAtom);
    const [gameOver, setGameOver] = useAtom(gameOverAtom);

    // derived state for always having a valid mine count
    const validMineAmount = Math.min(mineAmount, gridSize ** 2 - 1);
    const [cells, setCells] = useState(() => fieldService.generateMineField(gridSize ** 2, validMineAmount));

    useEffect(() => {
        setCells(fieldService.generateMineField(gridSize ** 2, validMineAmount));
    }, [gridSize, validMineAmount, fieldService]);

    useEffect(() => {
        const maxMines = gridSize ** 2 - 1;
        if (mineAmount > maxMines) {
            setMineAmount(maxMines);
        }

    }, [gridSize, mineAmount, setMineAmount]);

    return {
        gridSize, setGridSize,
        capital, setCapital,
        mineAmount, setMineAmount, validMineAmount,
        bet, setBet,
        currentMultiplier, setCurrentMultiplier,
        gameStats, setGameStats,
        gameOver, setGameOver,
        cells, setCells,
        gameService
    }
}