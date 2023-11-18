// Import the existing module types
import '@mui/material/styles';

interface LightAndDarkSupport {
    light: string;
    dark: string;
}

declare module '@mui/material/styles' {
    interface TypeBackground extends LightAndDarkSupport { }
}