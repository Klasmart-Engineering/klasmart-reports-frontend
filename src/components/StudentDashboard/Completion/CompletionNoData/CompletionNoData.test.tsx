import render from "../../../../../tests/utils/render";
import CompletionNoData from "./CompletionNoData";
import React from "react";
import { screen } from "@testing-library/react";

describe(`CompletionNoData`, () => {
    describe(`Render`, () => {
        test(`CompletionNoData renders correctly`, () => {
            render(<CompletionNoData />);
            
            expect(screen.queryByText(`Get a summary of the completion status of all assignments from your teacher`)).toBeInTheDocument();
            expect(screen.queryByText(`This week`)).toBeInTheDocument();
            expect(screen.queryByText(`Total assignment`)).toBeInTheDocument();
        });
    });
});
