import render from "../../../../../tests/utils/render";
import LearningOutcomeSummaryNoData from "./LearningOutcomeSummaryNoData";
import React from "react";
import { screen } from "@testing-library/react";

describe(`LearningOutcomeSummaryNoData`, () => {
    describe(`Render`, () => {
        test(`LearningOutcomeSummaryNoData renders correctly`, () => {
            render(<LearningOutcomeSummaryNoData />);
            
            expect(screen.getByText("Cognitive Skill")).toBeInTheDocument();
            expect(screen.getByText("Physical")).toBeInTheDocument();
            expect(screen.getByText("Emotional")).toBeInTheDocument();
            expect(screen.getByText("Social")).toBeInTheDocument();
            expect(screen.getByText("Gross Motor Skills")).toBeInTheDocument();
            expect(screen.getByText("You will see your top 5 skill areas from the last 7 days.")).toBeInTheDocument();
        });
    });
});
