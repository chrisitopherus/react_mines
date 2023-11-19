import { SelectChangeEvent } from "@mui/material";

export type SelectChangeHandler = ((event: SelectChangeEvent<number>, child: React.ReactNode) => void)