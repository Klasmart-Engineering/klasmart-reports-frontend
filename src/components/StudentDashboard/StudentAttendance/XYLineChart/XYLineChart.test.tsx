import render from "../../../../../tests/utils/render";
import XYLineChart, { XYLineChartProps } from "./XYLineChart";
import React from "react";

const mockedData = [
    {
        "class_date": "2020-01-18",
        "rate": 0.7,
    },
    {
        "class_date": "2020-01-19",
        "rate": 0.05,
    },
    {
        "class_date": "2020-01-20",
        "rate": 0.7,
    },
    {
        "class_date": "2020-01-21",
        "rate": 0.85,
    },
];

describe(`XYLineChart`, () => {

    const defaultProps: XYLineChartProps = {
        data: mockedData,
        width: 100,
        height: 100,
        color: `black`,
    }

    describe(`Render`, () => {
        test(`defaultProps`, () => {
            render(<XYLineChart {...defaultProps} />);
        });
    });
});
