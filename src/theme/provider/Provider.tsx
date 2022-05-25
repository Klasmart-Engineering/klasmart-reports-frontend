import { useThemeProvider } from "../utils/utils";
import { ThemeProvider as MUIThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import React from "react";
import { CssBaseline } from "@mui/material";
import { StylesProvider, createGenerateClassName } from '@mui/styles';

const generateClassName = createGenerateClassName({
    productionPrefix: 'reports',
    seed: 'reports'
});

const ThemeProvider: React.FC = (props) => {
    return (
        <StyledEngineProvider injectFirst>
            <MUIThemeProvider theme={useThemeProvider()}>
                <StylesProvider generateClassName={generateClassName}>
                    <CssBaseline />
                    {props.children}
                </StylesProvider>
            </MUIThemeProvider>
        </StyledEngineProvider>
    );
};

export default ThemeProvider;