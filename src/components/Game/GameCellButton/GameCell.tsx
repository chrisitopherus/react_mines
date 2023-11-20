import { Button, ButtonOwnProps, Grid } from "@mui/material";
import { CellType } from "../../../types/cell";
import { MouseEventHandler } from "react";

interface GameCellProps {
    index: number;
    gridSize: number;
    isRevealed: boolean;
    type: CellType
    clickHandler: MouseEventHandler<HTMLButtonElement>
}

const buttonStyles = {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: "100%",
    padding: 0,
    margin: 0,
    overflow: "hidden",
    transition: 'transform 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
        opacity: 0.9
    },
}

function renderCell(props: GameCellProps) {
    let color: ButtonOwnProps["color"];
    if (props.isRevealed) {
        if (props.type === CellType.Mine) color = "error";
        else color = "success";
    } else {
        color = "primary";
    }

    return (
        <Button data-index={props.index} variant="contained" color={color} sx={{ ...buttonStyles, pointerEvents: props.isRevealed ? "none" : "all" }} onClick={props.clickHandler}></Button>
    );
}


export default function GameCell({ index, gridSize, isRevealed, type, clickHandler }: GameCellProps) {
    return (
        <Grid item xs={12 / gridSize} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {renderCell({ index, gridSize, isRevealed, type, clickHandler })}
        </Grid>
    )
}