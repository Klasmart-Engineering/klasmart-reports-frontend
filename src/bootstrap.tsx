import React from "react";
import ReactDOM from "react-dom";

import AboutPage from "./pages/about";

function main () {
    const div = document.getElementById(`app`);
    ReactDOM.render(<AboutPage />, div);
}

main();
