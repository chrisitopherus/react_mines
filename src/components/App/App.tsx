import { ChangeEvent, useEffect, useState } from "react";
import './App.css'
import { AppBar, Box, Grid, LinearProgress, SelectChangeEvent, Toolbar, Typography, useTheme } from '@mui/material';
import { gridSizeAtom } from '../../atoms/gridSize.atom';
import { useAtom } from 'jotai';
import GameSideBar from '../Game-SideBar/Game-SideBar';
import { capitalAtom } from '../../atoms/capital.atom';
import { mineAmountAtom } from '../../atoms/mineAmount.atom';
import { betAtom } from '../../atoms/bet.atom';
import GameField from "../Game/GameField/GameField";
import { FieldGenerationService } from '../../services/fieldGenerationService';
import { currentMultiplierAtom } from "../../atoms/currentMultiplier.atom";
import { gameStatsAtom } from "../../atoms/gameStats.atom";
import { CellType } from "../../types/cell";
import { GameService } from "../../services/gameService";
import { gameOverAtom } from "../../atoms/gameOver.atom";
import useSound from "../../hooks/useSound";
import { soundMuteAtom } from "../../atoms/soundMute.atom";

const fieldService = new FieldGenerationService();
const gameService = new GameService(25, 1);
function App() {
    const theme = useTheme();
    const [gridSize, setGridSize] = useAtom(gridSizeAtom);
    const [captial, setCapital] = useAtom(capitalAtom);
    const [mineAmount, setMineAmount] = useAtom(mineAmountAtom);
    const [bet, setBet] = useAtom(betAtom);
    const [currentMultiplier, setCurrentMultiplier] = useAtom(currentMultiplierAtom);
    const [gameStats, setGameStats] = useAtom(gameStatsAtom);
    const [gameOver, setGameOver] = useAtom(gameOverAtom);
    const [soundMute] = useAtom(soundMuteAtom);
    const [isRoundActive, setIsRoundActive] = useState(true);

    const [explosionSound] = useSound({ src: "/sounds/explosion.mp3" });
    const [gemSound] = useSound({ src: "/sounds/gem.mp3" });

    // derived state for always having a valid mine count
    const validMineAmount = Math.min(mineAmount, gridSize ** 2 - 1);
    const [cells, setCells] = useState(() => fieldService.generateMineField(gridSize ** 2, validMineAmount));

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let timer: number;

        if (isRoundActive) {
            timer = setInterval(() => {
                setProgress((oldProgress) => {
                    if (oldProgress >= 100) {
                        clearInterval(timer);
                        setGameOver(true);
                        return 100; // Or reset to 0 based on your game logic
                    }
                    return oldProgress + 0.1;
                });
            }, 10);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isRoundActive, setGameOver]);

    useEffect(() => {
        setCells(fieldService.generateMineField(gridSize ** 2, validMineAmount));
    }, [gridSize, validMineAmount]);

    useEffect(() => {
        const maxMines = gridSize ** 2 - 1;
        if (mineAmount > maxMines) {
            setMineAmount(maxMines);
        }

    }, [gridSize, mineAmount, setMineAmount]);

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
            stopProgress();
        } else {
            // found diamond
            clickedCell.isRevealed = true;
            gameService.foundDiamond();
            setCurrentMultiplier(gameService.currentMultiplier);
            gemSound.play(soundMute);
            resetProgress();
        }

        setCells(copyOfCells);

        // at this point the currentMultiplier is not the updated value
    }

    function gameEndHandler() {
        // 
    }

    function startProgress() {
        setIsRoundActive(true);
        setProgress(0);
    }

    function stopProgress() {
        setIsRoundActive(false);
    }

    function resetProgress() {
        setProgress(0);
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
                        value: captial,
                        changeHandler: capitalChangeHandler
                    }} mineAmount={{
                        value: validMineAmount,
                        changedHandler: mineAmountChangedHandler
                    }} bet={{
                        value: bet,
                        changeHandler: betChangeHandler
                    }} />
                </Grid>
                {/* Game*/}
                <Grid item className="rightRounded" component={"section"} xs={8}
                    sx={{ backgroundColor: theme.palette.primary.dark, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <Box component={"header"} sx={{ width: "100%", padding: 2 }}>
                        <LinearProgress variant="determinate" color="secondary" value={progress} sx={{ height: "10px" }} />
                    </Box>
                    <GameField cellClickHandler={cellClickHandler} gameEndHandler={gameEndHandler} gridSize={gridSize} cells={cells} />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default App
