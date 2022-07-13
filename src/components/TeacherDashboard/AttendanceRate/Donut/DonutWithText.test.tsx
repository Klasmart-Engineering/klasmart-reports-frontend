import render from "../../../../../tests/utils/render";
import DonutWithText from "./DonutWithText";
import { Props as DonutWithTextProps } from "./typings";
import { defaultOptions } from "./defaultOptions";
import { screen } from "@testing-library/react";
import React from "react";

const mockedData = [
    {
        label: `High attendance`,
        color: `info`,
        value: 20,
    },
    {
        label: `Medium attendance`,
        color: `warning`,
        value: 60,
    },
    {
        label: `Low attendance`,
        color: `error`,
        value: 10,
        count: 2,
    },
];

describe(`DonutWithText`, () => {

    const defaultProps: DonutWithTextProps = {
        data: mockedData,
        options: defaultOptions,
    }

    describe(`Render`, () => {
        test(`defaultProps`, () => {
            render(<DonutWithText {...defaultProps} />);

            expect(screen.getByText("Students with low attendance")).toBeInTheDocument();
        });
    });
});
