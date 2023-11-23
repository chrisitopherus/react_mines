import { Box, Button, Container, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Typography, useTheme } from "@mui/material";
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import { SelectChangeHandler } from "../../types/eventHandlers";
import { GameStats } from "../GameStats/GameStats";
import { useAtom } from "jotai";
import { betAtom } from "../../atoms/bet.atom";

interface GameSideBarProps {
    gridSize: {
        currentGridSize: number;
        minGridSize: number;
        maxGridSize: number;
        changedHandler: SelectChangeHandler;
    };

    capital: {
        value: number;
    },

    mineAmount: {
        value: number;
        changedHandler: SelectChangeHandler
    },

    diamondsLeft: number;

    betProps: {
        placeBetHandler: MouseEventHandler<HTMLButtonElement>;
    },

    isPlaying: boolean;

    cashOutHandler: MouseEventHandler<HTMLButtonElement>;
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

export default function GameSideBar({ gridSize, capital, mineAmount, betProps, isPlaying, diamondsLeft, cashOutHandler }: GameSideBarProps) {
    const theme = useTheme();
    const [bet, setBet] = useAtom(betAtom);
    const [betDisplayValue, setBetDisplayValue] = useState(bet.toString());
    const [betError, setBetError] = useState(false);

    function validateBet(event: ChangeEvent<HTMLInputElement>) {
        const rawValue = event.target.value;
        const betValue = +rawValue;
        setBetDisplayValue(rawValue);
        if (isNaN(betValue) || !Number.isInteger(betValue) || betValue < 0 || betValue > capital.value) {
            setBetError(true);
        } else {
            setBetError(false);
            setBet(betValue);
        }
    }

    useEffect(() => {
        if (capital.value < bet) {
            setBetError(true);
        }
    }, [capital.value, bet]);

    return (
        <Container className="leftRounded" component={"section"} sx={{ display: "flex", flexDirection: "column", backgroundColor: theme.palette.primary.main, height: "100%", padding: 2, justifyContent: "space-between" }}>
            <Box component={"section"} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box component={"section"} display="flex" gap={1}>
                    <FormControl disabled fullWidth size="small">
                        <InputLabel >Capital</InputLabel>
                        <OutlinedInput
                            value={capital.value}
                            inputProps={{
                                step: "1"
                            }}
                            startAdornment={<InputAdornment position="start">€</InputAdornment>}
                            label="Capital"
                        />
                    </FormControl>
                    <FormControl disabled={isPlaying} fullWidth size="small">
                        <InputLabel >Bet</InputLabel>
                        <OutlinedInput
                            onChange={validateBet}
                            value={betDisplayValue}
                            inputProps={{
                                step: "1"
                            }}
                            startAdornment={<InputAdornment position="start">€</InputAdornment>}
                            label="Bet"
                        />
                        {betError && <FormHelperText>Invalid bet amount</FormHelperText>}
                    </FormControl>
                </Box>
                <Box component={"section"} sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography>
                        Grid size:
                    </Typography>
                    <Select disabled={isPlaying} value={gridSize.currentGridSize} onChange={gridSize.changedHandler} size="small">
                        {generateGridSizeSelectItems(gridSize.minGridSize, gridSize.maxGridSize)}
                    </Select>
                </Box>
                <Box component={"section"} sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography>
                        Mines:
                    </Typography>
                    <Select disabled={isPlaying} value={mineAmount.value} onChange={mineAmount.changedHandler} size="small">
                        {generateMinesAmountItems(gridSize.currentGridSize ** 2 - 1)}
                    </Select>
                </Box>
                <Button disabled={isPlaying || betError || capital.value <= 0} variant="contained" color="secondary" onClick={betProps.placeBetHandler}>Bet</Button>
                <Button disabled={!isPlaying} variant="contained" color="secondary" onClick={cashOutHandler}>Cashout</Button>
            </Box>
            <Box component={"section"} display="flex" gap={1}>
                <FormControl disabled fullWidth size="small">
                    <InputLabel>Mines</InputLabel>
                    <OutlinedInput
                        value={mineAmount.value}
                        startAdornment={<InputAdornment position="start">💣</InputAdornment>}
                        label="Mines"
                    />
                </FormControl>
                <FormControl disabled fullWidth size="small">
                    <InputLabel>Gems</InputLabel>
                    <OutlinedInput
                        value={diamondsLeft} // Assuming this is where you're tracking gems
                        startAdornment={<InputAdornment position="start">💎</InputAdornment>}
                        label="Gems"
                    />
                </FormControl>
            </Box>
            <Box component={"section"}>
                <GameStats />
            </Box>
        </Container>
    )
}