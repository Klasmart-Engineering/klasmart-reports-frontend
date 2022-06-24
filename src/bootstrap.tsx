
import ThemeProvider from "../src/theme/provider";
import LocaleProvider from "./locale/Provider";
import ReactDOM from "react-dom";
import { GlobalStateProvider } from "@kl-engineering/frontend-state";

function main() {
    const div = document.getElementById(`app`);
    ReactDOM
        .render(
            <GlobalStateProvider cookieDomain={process.env.COOKIE_DOMAIN ?? ``}>
                <App />
            </GlobalStateProvider>
            , div);
}

const App = () => (
        <LocaleProvider locale={`en`}>
            <ThemeProvider>
                <></>
            </ThemeProvider>
        </LocaleProvider>
);

main();