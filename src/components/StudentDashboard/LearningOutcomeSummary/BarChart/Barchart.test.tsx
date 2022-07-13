import render from "../../../../../tests/utils/render";
import BarChart, { BarChartProps } from "./BarChart";
import { screen } from "@testing-library/react";
import React from "react";

const mockedData = [
    {
        "skill": "Cognitive Skill",
        "achieved": 34,
        "notAchieved": 1,
    },
    {
        "skill": "Physical",
        "achieved": 17,
        "notAchieved": 13,
    },
    {
        "skill": "Emotional",
        "achieved": 20,
        "notAchieved": 7,
    },
    {
        "skill": "Social",
        "achieved": 17,
        "notAchieved": 5,
    },
    {
        "skill": "Gross Motor Skills",
        "achieved": 10,
        "notAchieved": 7,
    },
];

describe(`BarChart`, () => {

    const defaultProps: BarChartProps = {
        data: mockedData,
        width: 100,
        height: 100,
    }

    describe(`Render`, () => {
        test(`defaultProps`, () => {
            render(<BarChart {...defaultProps} />);

            expect(screen.getByText("Cognitive Skill")).toBeInTheDocument();
            expect(screen.getByText("Physical")).toBeInTheDocument();
            expect(screen.getByText("Emotional")).toBeInTheDocument();
            expect(screen.getByText("Social")).toBeInTheDocument();
            expect(screen.getByText("Gross Motor Skills")).toBeInTheDocument();
        });
    });
});
