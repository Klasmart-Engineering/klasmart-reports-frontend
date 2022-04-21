import { useThemeProvider } from "../utils/utils";
import { ThemeProvider as MUIThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeProvider: React.FC = (props) => {
    return (
        <StyledEngineProvider injectFirst>
            <MUIThemeProvider theme={useThemeProvider()}>
                <CssBaseline />
                {props.children}
            </MUIThemeProvider>
        </StyledEngineProvider>
    );
};

export default ThemeProvider;
