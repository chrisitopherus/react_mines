import { Typography, Grid, useTheme, Box } from "@mui/material";
import { useAtom } from "jotai";
import { gameStatsAtom } from "../../atoms/gameStats.atom";
export function GameStats() {
    const theme = useTheme();
    const [gameStats] = useAtom(gameStatsAtom);

    return (
        <Box component={"footer"}>
            <Typography color={theme.palette.text.secondary} gutterBottom>
                Statistics
            </Typography>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Typography>
                        Profits
                    </Typography>
                    <Typography color="success.main">
                        {gameStats.profits}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>
                        Losses
                    </Typography>
                    <Typography color={theme.palette.error.main}>
                        {gameStats.losses}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>
                        Total Profit
                    </Typography>
                    <Typography color={gameStats.profit < 0 ? theme.palette.error.main : theme.palette.success.main}>
                        {gameStats.profit.toFixed(2)} €
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>
                        Sales Volume
                    </Typography>
                    <Typography color={theme.palette.text.primary}>
                        {gameStats.salesVolume.toFixed(2)} €
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}