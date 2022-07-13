import render from "../../../../../tests/utils/render";
import ChartLegend, { ChartLegendProps } from "./ChartLegend";
import { screen } from "@testing-library/react";
import React from "react";

describe(`ChartLegend`, () => {

    const defaultProps: ChartLegendProps = {
        dataLength: 1,
        width: 100,
        height: 100,
        colorRange: [],
    }

    describe(`Render`, () => {
        test(`defaultProps`, () => {
            render(<ChartLegend {...defaultProps} />);

            expect(screen.getByText("Achieved")).toBeInTheDocument();
            expect(screen.getByText("Not Achieved")).toBeInTheDocument();
            expect(screen.getByText("Top Skill")).toBeInTheDocument();
        });
    });
});
