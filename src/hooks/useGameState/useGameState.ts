import { useAtom } from "jotai";
import { gridSizeAtom } from "../../atoms/gridSize.atom";
import { capitalAtom } from "../../atoms/capital.atom";
import { mineAmountAtom } from "../../atoms/mineAmount.atom";
import { betAtom } from "../../atoms/bet.atom";
import { currentMultiplierAtom } from "../../atoms/currentMultiplier.atom";
import { gameStatsAtom } from "../../atoms/gameStats.atom";
import { gameOverAtom } from "../../atoms/gameOver.atom";
import { useEffect, useMemo, useRef, useState } from "react";
import { FieldGenerationService } from "../../services/fieldGenerationService";
import { GameService } from "../../services/gameService";
import { FieldStateController } from "./FieldStateController";
import { diamoundAmountAtom } from "../../atoms/diamondAmount.atom";
import { CellInformation } from "../../types/cell";

export function useGameState() {
    const fieldService = useMemo(() => new FieldGenerationService(), []);
    const [fieldState, setFieldState] = useState(false);
    const fieldController = useMemo(() => new FieldStateController({ helperState: fieldState, setHelperState: setFieldState }), [fieldState]);
    const [gridSize, setGridSize] = useAtom(gridSizeAtom);
    const [capital, setCapital] = useAtom(capitalAtom);
    const [mineAmount, setMineAmount] = useAtom(mineAmountAtom);
    const [diamondAmount, setDiamondAmount] = useAtom(diamoundAmountAtom);

    const gameServiceRef = useRef(new GameService(gridSize ** 2, mineAmount));

    const [bet, setBet] = useAtom(betAtom);
    const [currentMultiplier, setCurrentMultiplier] = useAtom(currentMultiplierAtom);
    const [gameStats, setGameStats] = useAtom(gameStatsAtom);
    const [gameOver, setGameOver] = useAtom(gameOverAtom);

    // derived state for always having a valid mine count
    const validMineAmount = Math.min(mineAmount, gridSize ** 2 - 1);
    const [cells, setCells] = useState<CellInformation[]>(() => []);

    useEffect(() => {
        const newCells = fieldService.generateMineField(gridSize ** 2, validMineAmount);
        setCells(newCells);
    }, [gridSize, validMineAmount, fieldService, fieldState]);

    useEffect(() => {
        const size = gridSize ** 2;
        const maxMines = size - 1;
        if (mineAmount > maxMines) {
            setMineAmount(maxMines);
            setDiamondAmount(1);
        }

        setDiamondAmount(size - mineAmount);

    }, [gridSize, mineAmount, setDiamondAmount, setMineAmount]);

    useEffect(() => {
        if (gameServiceRef.current) {
            const size = gridSize ** 2;
            gameServiceRef.current.changeData(size, validMineAmount);
        }
    }, [gridSize, validMineAmount]);

    // useEffect(() => {
    //     console.debug("cells changed", cells);
    // }, [cells])

    return {
        gridSize, setGridSize,
        capital, setCapital,
        mineAmount, setMineAmount, validMineAmount,
        diamondAmount, setDiamondAmount,
        bet, setBet,
        currentMultiplier, setCurrentMultiplier,
        gameStats, setGameStats,
        gameOver, setGameOver,
        cells, setCells,
        fieldController,
        gameService: gameServiceRef.current
    }
}