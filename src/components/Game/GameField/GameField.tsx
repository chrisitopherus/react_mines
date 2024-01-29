import { Backdrop, Grid } from "@mui/material";
import GameCell from "../GameCell/GameCell";
import { CellInformation } from "../../../types/cell";
import { MouseEventHandler } from "react";

import Lottie from "lottie-react";
import explosion from "../../../assets/animations/explosion.json";
import confetti from "../../../assets/animations/confetti.json";
import { gameOverAtom } from "../../../atoms/gameOver.atom";
import { useAtom } from "jotai";
import { gameWonAtom } from "../../../atoms/gameWon";

function generateCells(gridSize: number, cells: CellInformation[], isActive: boolean, clickHandler: MouseEventHandler<HTMLButtonElement>) {
    const end = gridSize ** 2;
    const cellElements: JSX.Element[] = [];
    for (let i = 0; i < end; i++) {
        cellElements.push(<GameCell clickHandler={clickHandler} isRevealed={cells[i].isRevealed} isActive={isActive} type={cells[i].type} key={i} index={i} gridSize={gridSize} />);
    }

    return cellElements;
}

interface GameFieldProps {
    gridSize: number;
    cells: CellInformation[];
    isActive: boolean;
    cellClickHandler: MouseEventHandler<HTMLButtonElement>,
}

export default function GameField({ gridSize, cells, isActive, cellClickHandler }: GameFieldProps) {
    const [gameOver, setGameOver] = useAtom(gameOverAtom);
    const [gameWon, setGameWon] = useAtom(gameWonAtom);

    function handleLoosingAnimationComplete() {
        setGameOver(false);
    }

    function handleWinningAnimationComplete() {
        setGameWon(false);
    }

    return (
        <Grid container spacing={1} component={"section"}
            sx={{ width: "100%", height: "100%", maxWidth: "900px", minWidth: "500px", maxHeight: "500px", overflow: "auto", padding: 1 }}>
            {(cells.length !== gridSize ** 2) ? "" : generateCells(gridSize, cells, isActive, cellClickHandler)}
            {gameOver &&
                <Backdrop component={"section"} open={gameOver} sx={{ display: "flex", flexDirection: "column", backgroundColor: "transparent" }}>
                    <Lottie
                        animationData={explosion}
                        style={{ width: "100%", height: "100%" }}
                        loop={false}
                        onComplete={handleLoosingAnimationComplete}
                    />
                </Backdrop>}
            {gameWon &&
                <Backdrop component={"section"} open={gameWon} sx={{ display: "flex", flexDirection: "column", backgroundColor: "transparent" }}>
                    <Lottie
                        animationData={confetti}
                        style={{ width: "100%", height: "100%" }}
                        loop={false}
                        onComplete={handleWinningAnimationComplete}
                    />
                </Backdrop>}
        </Grid>
    );
}