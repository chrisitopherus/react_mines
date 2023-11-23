import { useState } from "react";
import './App.css'
import { Box, Grid, IconButton, LinearProgress, SelectChangeEvent, Typography, useTheme } from '@mui/material';
import { useAtom } from 'jotai';
import GameSideBar from '../Game-SideBar/Game-SideBar';
import GameField from "../Game/GameField/GameField";
import { CellInformation, CellType } from "../../types/cell";
import { useSound } from "../../hooks/useSound/useSound";
import { soundMuteAtom } from "../../atoms/soundMute.atom";
import { useProgressTimer } from "../../hooks/useProgressTimer/useProgressTimer";
import { useGameState } from "../../hooks/useGameState/useGameState";
import { VolumeOff, VolumeUp } from "@mui/icons-material";
function App() {
    const theme = useTheme();
    const [soundMute, setSoundMute] = useAtom(soundMuteAtom);
    const [isRoundActive, setIsRoundActive] = useState(false);
    const { progressTimer, progress } = useProgressTimer(isRoundActive, setIsRoundActive, progressTimerFinishedHandler, { seconds: 10, frequency: 100 });
    const {
        gridSize, setGridSize,
        capital, setCapital,
        setMineAmount, validMineAmount,
        diamondAmount, setDiamondAmount,
        bet,
        currentMultiplier, setCurrentMultiplier,
        gameStats, setGameStats,
        setGameOver,
        cells, setCells,
        fieldController, gameService
    } = useGameState();

    const [explosionSound] = useSound({ src: "/sounds/explosion.mp3" });
    const [gemSound] = useSound({ src: "/sounds/gem.mp3" });

    function gridSizeChangedHandler(event: SelectChangeEvent<number>) {
        setGridSize(+event.target.value);
    }

    function mineAmountChangedHandler(event: SelectChangeEvent<number>) {
        setMineAmount(+event.target.value);
    }

    function placeBetHandler() {
        setCurrentMultiplier(gameService.currentMultiplier);
        setIsRoundActive(true);
        progressTimer.start();
        fieldController.triggerNewFieldGeneration();
    }

    function cellClickHandler(event: React.MouseEvent) {
        const target = event.currentTarget as HTMLButtonElement;
        const tempIndex = target.dataset.index;
        if (tempIndex === undefined) throw new TypeError("Button must have an index data attribute");
        const index = +tempIndex;

        const copyOfCells = cells.slice();
        const clickedCell = copyOfCells[index];
        if (clickedCell.isRevealed) return;
        if (clickedCell.type === CellType.Mine) {
            handleMine(clickedCell);
        } else {
            handleDiamond(clickedCell);
        }

        setCells(copyOfCells);
        // at this point the currentMultiplier is not the updated value
    }

    function handleDiamond(cell: CellInformation) {
        cell.isRevealed = true;
        gameService.foundDiamond();
        setDiamondAmount(gameService.diamondsLeft);
        setCurrentMultiplier(gameService.currentMultiplier);
        gemSound.play(soundMute);
        progressTimer.reset();
    }

    function handleMine(cell: CellInformation) {
        cell.isRevealed = true;
        setGameOver(true);
        explosionSound.play(soundMute);
        updateFinances({ won: false });
        progressTimer.stop();
        gameService.reset();
        setCurrentMultiplier(gameService.currentMultiplier);
    }

    function gameEndHandler() {
        // 
    }

    function updateFinances(result: { won: boolean }) {
        console.log("Updating finances");
        let value: number;
        if (result.won) {
            value = bet * gameService.currentMultiplier - bet;
        } else {
            value = -bet;
        }

        updateStats(value);
        setCapital((prev) => prev + value);
    }

    function cashOutHandler() {
        progressTimer.stop();
        progressTimer.reset();
        setIsRoundActive(false);
        updateFinances({ won: true });
        gameService.reset();
    }

    function handleMuteToggle() {
        setSoundMute(!soundMute);
    }

    function updateStats(value: number) {
        if (value === 0) return;
        const copyOfStats = { ...gameStats };
        if (value < 0) {
            copyOfStats.losses++;
        } else {
            copyOfStats.profits++;
            copyOfStats.salesVolume += value;
        }

        copyOfStats.profit += value;
        setGameStats(copyOfStats);
    }

    function progressTimerFinishedHandler() {
        setGameOver(true);
        explosionSound.play(soundMute);
        updateFinances({ won: false });
        progressTimer.stop();
        gameService.reset();
        setCurrentMultiplier(gameService.currentMultiplier);
    }

    return (
        <Grid container className="container"
            component={"main"}
            sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            {/* header */}
            <Box component={"header"} display={"flex"} justifyContent={"center"} margin={2}>
                <Typography variant="h1" fontSize={theme.typography.h2.fontSize}>
                    Mines
                </Typography>
            </Box>
            {/* main section */}
            <Grid container item component={"section"} sx={{ flexGrow: 1, paddingLeft: 2, paddingRight: 2, paddingBottom: 2 }}>
                {/* sidebar (game configuration) */}
                <Grid item className="leftRounded" component={"aside"} xs={4} sx={{ backgroundColor: theme.palette.primary.dark, padding: 2 }}>
                    <GameSideBar gridSize={{
                        currentGridSize: gridSize,
                        minGridSize: 5,
                        maxGridSize: 10,
                        changedHandler: gridSizeChangedHandler
                    }} capital={{ value: capital }} mineAmount={{
                        value: validMineAmount,
                        changedHandler: mineAmountChangedHandler
                    }} betProps={{ placeBetHandler: placeBetHandler }}
                        diamondsLeft={diamondAmount}
                        isPlaying={isRoundActive}
                        cashOutHandler={cashOutHandler} />
                </Grid>
                {/* Game*/}
                <Grid item className="rightRounded" component={"section"} xs={8}
                    sx={{ backgroundColor: theme.palette.primary.dark, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <Box component={"header"} sx={{ width: "100%", padding: 2 }}>
                        <LinearProgress variant="determinate" color="secondary" value={progress} sx={{
                            height: "10px",
                            "& .MuiLinearProgress-bar": {
                                transition: "transform .1s linear"
                            }
                        }} />
                    </Box>
                    <Box component={"header"} sx={{ display: "flex", justifyContent: "space-between", width: "100%", paddingLeft: 2, paddingRight: 2 }}>
                        <Typography variant="h4">Multiplier: {currentMultiplier}</Typography>
                        <IconButton onClick={handleMuteToggle} aria-label="toggle sound">
                            {soundMute ? <VolumeOff /> : <VolumeUp />}
                        </IconButton>
                    </Box>
                    <GameField cellClickHandler={cellClickHandler} gameEndHandler={gameEndHandler} gridSize={gridSize} cells={cells} isActive={isRoundActive} />
                </Grid>
            </Grid>
        </Grid >
    )
}

export default App
