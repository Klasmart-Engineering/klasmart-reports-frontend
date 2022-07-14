import render from "../../../../../tests/utils/render";
import AchievementNoData from "./AchievementNoData";
import { screen } from "@testing-library/react";
import React from "react";

describe(`AchievementNoData`, () => {
    describe(`Render`, () => {
        test(`AchievementNoData renders correctly`, () => {
            render(<AchievementNoData />);

            expect(screen.getByText(`Achieved`)).toBeInTheDocument();
            expect(screen.getByText(`Not Achieved`)).toBeInTheDocument();
            expect(screen.getByText(`Pending`)).toBeInTheDocument();
            expect(screen.getByText(`Add learning outcomes to your content to see this chart.`)).toBeInTheDocument();
            expect(screen.getByText(`Last 7 Days`)).toBeInTheDocument();
            expect(screen.getByText(`Total Learning Outcomes`)).toBeInTheDocument();
        });
    });
});