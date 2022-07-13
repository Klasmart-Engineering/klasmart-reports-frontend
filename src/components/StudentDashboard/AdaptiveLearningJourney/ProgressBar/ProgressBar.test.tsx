import render from "../../../../../tests/utils/render";
import ProgressBar from "./ProgressBar";
import { screen } from "@testing-library/react";
import React from "react";

describe(`Popup`, () => {
    describe(`Render`, () => {
        test(`ProgressBar`, () => {
            render(<ProgressBar />);

            expect(screen.getByText("Overall Progress")).toBeInTheDocument();
        });
    });
});
