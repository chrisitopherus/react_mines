import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App.tsx'
import './index.css'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';


const theme = createTheme(
    {
        palette: {
            mode: "dark",
            primary: {
                main: "#1a2c38",
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
            },
        },
    }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
)
