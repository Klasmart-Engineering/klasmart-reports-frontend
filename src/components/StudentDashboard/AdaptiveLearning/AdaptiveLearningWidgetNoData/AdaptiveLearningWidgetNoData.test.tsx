import render from "../../../../../tests/utils/render";
import AdaptiveLearningWidgetNoData from "./AdaptiveLearningWidgetNoData";
import React from "react";
import { screen } from "@testing-library/react";

describe(`AdaptiveLearningWidgetNoData`, () => {
    describe(`Render`, () => {
        test(`AdaptiveLearningWidgetNoData renders correctly`, () => {
            render(<AdaptiveLearningWidgetNoData />);
            
            expect(screen.getByText(`Learning Boost`)).toBeInTheDocument();
            expect(screen.getByText(`Total Auto Reviews`)).toBeInTheDocument();
            expect(screen.getByText(`Skills Improved`)).toBeInTheDocument();
            expect(screen.getByText(`Skills`)).toBeInTheDocument();
            expect(screen.getByText(`Classes`)).toBeInTheDocument();
            expect(screen.getByText(`With Review`)).toBeInTheDocument();
            expect(screen.getByText(`Without Auto Review`)).toBeInTheDocument();
            expect(screen.getByText(`Top 3 improved skills`)).toBeInTheDocument();
            expect(screen.getByText(`Keep track of how much your skills are improving with adaptive learning`)).toBeInTheDocument();
        });
    });
});