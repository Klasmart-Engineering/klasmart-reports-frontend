import render from "../../../../../tests/utils/render";
import ChartLegend, { ChartLegendProps } from "./ChartLegend";
import React from "react";

describe(`ChartLegend`, () => {

    const defaultProps: ChartLegendProps = {
        colorRange: [`black`, `white`]
    }

    describe(`Render`, () => {
        test(`defaultProps`, () => {
            render(<ChartLegend {...defaultProps}/>);
        });
    });
});
