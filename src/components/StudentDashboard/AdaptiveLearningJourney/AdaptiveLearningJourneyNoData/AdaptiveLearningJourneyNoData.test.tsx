import render from "../../../../../tests/utils/render";
import AdaptiveLearningJourneyNoData from "./AdaptiveLearningJourneyNoData";
import React from "react";
import { screen } from "@testing-library/react";

describe(`AdaptiveLearningJourneyNoData`, () => {
    describe(`Render`, () => {
        test(`AdaptiveLearningJourneyNoData renders correctly`, () => {
            render(<AdaptiveLearningJourneyNoData />);

            expect(screen.getByText(`Sample`)).toBeInTheDocument();
            expect(screen.getByText(`Visually follow your Adaptive learning journey with this interactive map.`)).toBeInTheDocument();
        });
    });
});
