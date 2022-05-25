
import ThemeProvider from "../src/theme/provider";
import NextClass from "./components/StudentDashboard/NextClass/NextClass";
import LocaleProvider from "./locale/Provider";
import StoreProvider from "./store/Provider";
import React from "react";
import ReactDOM from "react-dom";
import CmsApiClientProvider from "@/Providers/CmsApiClient";

function main () {
    const div = document.getElementById(`app`);
    ReactDOM
        .render(<App />, div);
}

const App = () => (
    <StoreProvider>
        <CmsApiClientProvider>
            <LocaleProvider locale={`en`}>
                <ThemeProvider>
                    <NextClass />
                </ThemeProvider>
            </LocaleProvider>
        </CmsApiClientProvider>
    </StoreProvider>
    );

main();