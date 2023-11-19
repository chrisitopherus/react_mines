import { ChangeEvent, useEffect } from 'react'
import './App.css'
import { AppBar, CssBaseline, Grid, SelectChangeEvent, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import { MultiplierService } from '../../services/multiplierService';
import { gridSizeAtom } from '../../atoms/gridSize.atom';
import { useAtom } from 'jotai';
import GameSideBar from '../Game-SideBar/Game-SideBar';
import { capitalAtom } from '../../atoms/capital.atom';
import { mineAmountAtom } from '../../atoms/mineAmount.atom';
import { betAtom } from '../../atoms/bet.atom';

const theme = createTheme({
    palette: {
        primary: {
            main: "#1a2c38",
            light: "#213743",
            contrastText: "#e2dfe2"
        },
        secondary: {
            main: "#00e701",
            contrastText: "#1a2c38"
        },
        error: {
            main: "#ed4163",
        },
        background: {
            default: "#1a2c38",
            paper: "#e2dfe2",
        },
    },
});

const multiplier = new MultiplierService(25, 5);

const multis = [
    multiplier.calculateMultiplier(0),
    multiplier.calculateMultiplier(1),
    multiplier.calculateMultiplier(2),
    multiplier.calculateMultiplier(3),
    multiplier.calculateMultiplier(4)];

function App() {
    const [gridSize, setGridSize] = useAtom(gridSizeAtom);
    const [captial, setCapital] = useAtom(capitalAtom);
    const [mineAmount, setMineAmount] = useAtom(mineAmountAtom);
    const [bet, setBet] = useAtom(betAtom);

    const validMineAmount = Math.min(mineAmount, gridSize ** 2 - 1);

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

    console.log(multis);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
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
                    <Grid item component={"aside"} xs={4} sx={{ backgroundColor: theme.palette.primary.light, padding: 2 }}>
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
                    <Grid item xs={8}>
                        <h1>Hi</h1>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default App
