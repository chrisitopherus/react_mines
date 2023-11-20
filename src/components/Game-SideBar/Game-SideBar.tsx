import { Box, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Typography, useTheme } from "@mui/material";
import { ChangeEventHandler } from "react";
import { SelectChangeHandler } from "../../types/eventHandlers";
import { useAtom } from "jotai";
import { soundMuteAtom } from "../../atoms/soundMute.atom";
import { VolumeOff, VolumeUp } from "@mui/icons-material";
import { gameStatsAtom } from "../../atoms/gameStats.atom";

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
    const theme = useTheme();
    const [soundMute, setSoundMute] = useAtom(soundMuteAtom);
    const [gameStats, setGameStats] = useAtom(gameStatsAtom);

    function handleMuteToggle() {
        setSoundMute(!soundMute);
    }

    return (
        <Container className="leftRounded" component={"section"} sx={{ display: "flex", flexDirection: "column", backgroundColor: theme.palette.primary.main, height: "100%", padding: 2, justifyContent: "space-between" }}>
            <Box component={"section"} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <FormControl fullWidth size="small">
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
                <FormControl fullWidth size="small">
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
                    <Select value={gridSize.currentGridSize} onChange={gridSize.changedHandler} size="small">
                        {generateGridSizeSelectItems(gridSize.minGridSize, gridSize.maxGridSize)}
                    </Select>
                </Box>
                <Box component={"section"} sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography>
                        Mines:
                    </Typography>
                    <Select value={mineAmount.value} onChange={mineAmount.changedHandler} size="small">
                        {generateMinesAmountItems(gridSize.currentGridSize ** 2 - 1)}
                    </Select>
                </Box>
                <Button variant="contained" color="secondary">Bet</Button>
            </Box>
            <Box component={"section"}>
                {gameStats.salesVolume}
            </Box>
            {/* here is the options sections -> mute toggle button, show stats toggle etc.*/}
            <Box component={"footer"}>
                <IconButton onClick={handleMuteToggle} aria-label="toggle sound">
                    {soundMute ? <VolumeOff /> : <VolumeUp />}
                </IconButton>
            </Box>
        </Container>
    )
}