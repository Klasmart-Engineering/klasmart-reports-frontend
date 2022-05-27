
import ThemeProvider from "../src/theme/provider";
import LocaleProvider from "./locale/Provider";
import StoreProvider from "./store/Provider";
import React from "react";
import ReactDOM from "react-dom";
import LearningOutcomeSummary from "./components/StudentDashboard/LearningOutcomeSummary/LearningOutcomeSummary";
import { GlobalStateProvider } from "@kl-engineering/frontend-state";

function main () {
    const div = document.getElementById(`app`);
    ReactDOM
        .render(
            <GlobalStateProvider cookieDomain={process.env.COOKIE_DOMAIN ?? ``}>
                <App />
            </GlobalStateProvider>
        , div);
}

const App = () => (
    <StoreProvider>
            <LocaleProvider locale={`en`}>
                <ThemeProvider>
                    <LearningOutcomeSummary />
                </ThemeProvider>
            </LocaleProvider>
    </StoreProvider>
    );

main();