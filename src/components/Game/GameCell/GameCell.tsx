import { Grid } from "@mui/material";
import { CellType } from "../../../types/cell";
import { MouseEventHandler } from "react";
import { renderCell } from "./renderGameCell";

export interface GameCellProps {
    index: number;
    gridSize: number;
    isRevealed: boolean;
    type: CellType
    isActive: boolean;
    clickHandler: MouseEventHandler<HTMLButtonElement>
}

export default function GameCell(props: GameCellProps) {
    return (
        <Grid item xs={12 / props.gridSize} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {renderCell(props)}
        </Grid>
    )
}