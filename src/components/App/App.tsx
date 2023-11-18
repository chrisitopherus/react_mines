import { useState } from 'react'
import './App.module.css'

import { Box, Button, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { MultiplierService } from '../../services/multiplierService';

const theme = createTheme({
    palette: {
        background: {
            default: "#000",
            paper: ""
        }
    }
});
function App() {
    const [count, setCount] = useState(0)

    const multiplier = new MultiplierService(25, 5);

    const multis = [
        multiplier.calculateMultiplier(0),
        multiplier.calculateMultiplier(1),
        multiplier.calculateMultiplier(2),
        multiplier.calculateMultiplier(3),
        multiplier.calculateMultiplier(4)];

    console.log(multis);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ class,backgroundColor: theme.palette.background.default }}
                component={"main"}>
                <div>
                    <h1>
                        Hello
                    </h1>
                </div>
            </Box>
        </ThemeProvider>
    )
}

export default App
