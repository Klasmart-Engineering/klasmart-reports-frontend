import render from "../../../../../tests/utils/render";
import AchievementNoData from "./AchievementNoData";
import React from "react";
import { screen } from "@testing-library/react";

describe(`AchievementNoData`, () => {
    describe(`Render`, () => {
        test(`AchievementNoData renders correctly`, () => {
            render(<AchievementNoData />);

            expect(screen.queryByText(`Achieved`)).toBeInTheDocument();
            expect(screen.queryByText(`Not Achieved`)).toBeInTheDocument();
            expect(screen.queryByText(`Pending`)).toBeInTheDocument();
            expect(screen.queryByText(`Add learning outcomes to your content to see this chart.`)).toBeInTheDocument();
            expect(screen.queryByText(`Last 7 Days`)).toBeInTheDocument();
            expect(screen.queryByText(`Total Learning Outcomes`)).toBeInTheDocument();
        });
    });
});