import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import { ChangeEventHandler } from "react";
import { SelectChangeHandler } from "../../types/eventHandlers";

interface GameSideBarProps {
    gridSize: {
        currentGridSize: number;
        minGridSize: number;
        maxGridSize: number;
        changedHandler: SelectChangeHandler;
    };

    capital: {
        value: number;
        changeHandler: ChangeEventHandler<HTMLInputElement>;
    },

    mineAmount: {
        value: number;
        changedHandler: SelectChangeHandler
    },

    bet: {
        value: number;
        changeHandler: ChangeEventHandler<HTMLInputElement>;
    }
}

function generateGridSizeSelectItems(min: number, max: number) {
    const items: JSX.Element[] = [];
    for (let i = min; i < max + 1; i++) {
        items.push(<MenuItem key={i} value={i}>{`${i}x${i}`}</MenuItem>)
    }

    return items;
}

function generateMinesAmountItems(max: number) {
    const items: JSX.Element[] = [];
    for (let i = 1; i < max + 1; i++) {
        items.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
    }

    return items;
}

export default function GameSideBar({ gridSize, capital, mineAmount, bet }: GameSideBarProps) {
    return (
        <Box component={"section"} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl fullWidth>
                <InputLabel >Capital</InputLabel>
                <OutlinedInput
                    onChange={capital.changeHandler}
                    value={capital.value}
                    inputProps={{
                        step: "1"
                    }}
                    startAdornment={<InputAdornment position="start">€</InputAdornment>}
                    label="Capital"
                />
            </FormControl>
            <FormControl fullWidth>
                <InputLabel >Bet</InputLabel>
                <OutlinedInput
                    onChange={bet.changeHandler}
                    value={bet.value}
                    inputProps={{
                        step: "1"
                    }}
                    startAdornment={<InputAdornment position="start">€</InputAdornment>}
                    label="Bet"
                />
            </FormControl>
            <Box component={"section"} sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>
                    Grid size:
                </Typography>
                <Select value={gridSize.currentGridSize} onChange={gridSize.changedHandler}>
                    {generateGridSizeSelectItems(gridSize.minGridSize, gridSize.maxGridSize)}
                </Select>
            </Box>
            <Box component={"section"} sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>
                    Mines:
                </Typography>
                <Select value={mineAmount.value} onChange={mineAmount.changedHandler}>
                    {generateMinesAmountItems(gridSize.currentGridSize ** 2 - 1)}
                </Select>
            </Box>
            <Button variant="contained" color="secondary">Bet</Button>
        </Box>
    )
}