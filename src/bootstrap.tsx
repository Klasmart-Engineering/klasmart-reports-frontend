import ThemeProvider from "../src/theme/Provider";
import PendingAssessments from "./components/Widgets/PendingAssessments";
import LocaleProvider from "./locale/Provider";
import StoreProvider from "./store/Provider";
import React from "react";
import ReactDOM from "react-dom";

function main () {
    const div = document.getElementById(`app`);
    ReactDOM
        .render(<App />, div);
}

const App = () => (
    <StoreProvider>
        <LocaleProvider locale={`en`}>
            <ThemeProvider>
                <PendingAssessments />
            </ThemeProvider>
        </LocaleProvider>
    </StoreProvider>);

main();
