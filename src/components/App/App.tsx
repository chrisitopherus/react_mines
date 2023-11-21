import { ChangeEvent, useState } from "react";
import './App.css'
import { AppBar, Box, Grid, LinearProgress, SelectChangeEvent, Toolbar, Typography, useTheme } from '@mui/material';
import { useAtom } from 'jotai';
import GameSideBar from '../Game-SideBar/Game-SideBar';
import GameField from "../Game/GameField/GameField";
import { CellType } from "../../types/cell";
import { useSound } from "../../hooks/useSound/useSound";
import { soundMuteAtom } from "../../atoms/soundMute.atom";
import { useProgressTimer } from "../../hooks/useProgressTimer/useProgressTimer";
import { useGameState } from "../../hooks/useGameState/useGameState";
function App() {
    const theme = useTheme();
    const [soundMute] = useAtom(soundMuteAtom);
    const [isRoundActive, setIsRoundActive] = useState(false);
    const { progressTimer, progress } = useProgressTimer(isRoundActive, setIsRoundActive);
    const {
        gridSize, setGridSize,
        capital, setCapital,
        setMineAmount, validMineAmount,
        bet, setBet,
        currentMultiplier, setCurrentMultiplier,
        gameStats, setGameStats,
        gameOver, setGameOver,
        cells, setCells,
        gameService
    } = useGameState();

    const [explosionSound] = useSound({ src: "/sounds/explosion.mp3" });
    const [gemSound] = useSound({ src: "/sounds/gem.mp3" });

    function gridSizeChangedHandler(event: SelectChangeEvent<number>) {
        setGridSize(+event.target.value);
    }

    function capitalChangeHandler(event: ChangeEvent) {
        const input = +(event.target as HTMLInputElement).value;
        setCapital(input);
    }

    function mineAmountChangedHandler(event: SelectChangeEvent<number>) {
        setMineAmount(+event.target.value);
    }

    function betChangeHandler(event: ChangeEvent) {
        const input = +(event.target as HTMLInputElement).value;
        setBet(input);
    }

    function placeBetHandler() {
        setIsRoundActive(true);
        progressTimer.start();

        console.log(cells);
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
            // end game
            clickedCell.isRevealed = true;
            setGameOver(true);
            explosionSound.play(soundMute);
            progressTimer.stop();
        } else {
            // found diamond
            clickedCell.isRevealed = true;
            gameService.foundDiamond();
            setCurrentMultiplier(gameService.currentMultiplier);
            gemSound.play(soundMute);
            progressTimer.reset();
        }

        setCells(copyOfCells);

        // at this point the currentMultiplier is not the updated value
    }

    function gameEndHandler() {
        // 
    }

    function updateStats(value: number) {
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

    return (
        <Grid container className="container"
            component={"main"}
            sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            {/* header */}
            <AppBar position="static">
                <Toolbar component={"section"} variant="dense" sx={{ justifyContent: "center" }}>
                    <Typography variant="h1">
                        Mines
                    </Typography>
                </Toolbar>
            </AppBar>
            {/* main section */}
            <Grid container item component={"section"} sx={{ flexGrow: 1, padding: 4 }}>
                {/* sidebar (game configuration) */}
                <Grid item className="leftRounded" component={"aside"} xs={4} sx={{ backgroundColor: theme.palette.primary.dark, padding: 2 }}>
                    <GameSideBar gridSize={{
                        currentGridSize: gridSize,
                        minGridSize: 5,
                        maxGridSize: 10,
                        changedHandler: gridSizeChangedHandler
                    }} capital={{
                        value: capital,
                        changeHandler: capitalChangeHandler
                    }} mineAmount={{
                        value: validMineAmount,
                        changedHandler: mineAmountChangedHandler
                    }} bet={{
                        value: bet,
                        changeHandler: betChangeHandler,
                        placeBetHandler: placeBetHandler
                    }} />
                </Grid>
                {/* Game*/}
                <Grid item className="rightRounded" component={"section"} xs={8}
                    sx={{ backgroundColor: theme.palette.primary.dark, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <Box component={"header"} sx={{ width: "100%", padding: 2 }}>
                        <LinearProgress variant="determinate" color="secondary" value={progress} sx={{ height: "10px" }} />
                    </Box>
                    <Typography variant="h4">Current Multiplier: {currentMultiplier}</Typography>
                    <GameField cellClickHandler={cellClickHandler} gameEndHandler={gameEndHandler} gridSize={gridSize} cells={cells} isActive={isRoundActive} />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default App
