import { Button, ButtonOwnProps, SxProps, Theme } from "@mui/material";
import { GameCellProps } from "./GameCell";
import { CellType } from "../../../types/cell";

const buttonStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: 0,
    margin: 0,
    overflow: "hidden",
    transition: "transform 0.3s",
    "&:hover": {
        transform: "scale(1.05)",
        opacity: 0.9
    },
};

export function renderCell(props: GameCellProps, theme: Theme) {
    let color: ButtonOwnProps["color"];
    if (props.isRevealed) {
        if (props.type === CellType.Mine) color = "error";
        else color = "success";
    } else {
        color = "primary";
    }

    let additionalStyles = {};
    if (!props.isActive) {
        additionalStyles = {
            "&.Mui-disabled": {
                cursor: "not-allowed",
                pointerEvents: "all",
                backgroundColor: color === "primary" ? "" : color === "success" ? theme.palette.success.dark : theme.palette.error.dark,
            }
        } satisfies SxProps;
    }

    const isDisabled = !props.isActive;

    return (
        <Button disabled={isDisabled} data-index={props.index} variant="contained" color={color} sx={{ ...buttonStyles, ...additionalStyles }} onClick={props.clickHandler}></Button>
    );
}