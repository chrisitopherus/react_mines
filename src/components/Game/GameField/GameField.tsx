import { Backdrop, Button, Grid } from "@mui/material";
import GameCell from "../GameCellButton/GameCell";
import { CellInformation } from "../../../types/cell";
import { MouseEventHandler } from "react";

import Lottie from "lottie-react";
import explosion from "../../../assets/animations/explosion.json";
import { gameOverAtom } from "../../../atoms/gameOver.atom";
import { useAtom } from "jotai";

function generateCells(gridSize: number, cells: CellInformation[], clickHandler: MouseEventHandler<HTMLButtonElement>) {
    const end = gridSize ** 2;
    const cellElements: JSX.Element[] = [];
    for (let i = 0; i < end; i++) {
        cellElements.push(<GameCell clickHandler={clickHandler} isRevealed={cells[i].isRevealed} type={cells[i].type} key={i} index={i} gridSize={gridSize} />)
    }

    return cellElements;
}

interface GameFieldProps {
    gridSize: number;
    cells: CellInformation[];
    cellClickHandler: MouseEventHandler<HTMLButtonElement>,
    gameEndHandler: () => void;
}

export default function GameField({ gridSize, cells, cellClickHandler, gameEndHandler }: GameFieldProps) {
    const [gameOver, setGameOver] = useAtom(gameOverAtom);

    function overlayExitClickHandler() {
        setGameOver(false);
        gameEndHandler();
    }
    return (
        <Grid container spacing={1} component={"section"}
            sx={{ width: "100%", height: "100%", maxWidth: "900px", minWidth: "500px", maxHeight: "500px", overflow: "auto", padding: 1 }}>
            {(cells.length !== gridSize ** 2) ? "" : generateCells(gridSize, cells, cellClickHandler)}
            {gameOver &&
                <Backdrop component={"section"} open={gameOver} sx={{ display: "flex", flexDirection: "column" }}>
                    <Lottie animationData={explosion} style={{ width: "75%", height: "75%" }} />
                    <Button variant="contained" color="secondary" onClick={overlayExitClickHandler}>Exit</Button>
                </Backdrop>}
        </Grid>
    )
}