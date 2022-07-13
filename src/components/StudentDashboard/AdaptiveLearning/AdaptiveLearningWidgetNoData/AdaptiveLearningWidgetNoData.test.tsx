import render from "../../../../../tests/utils/render";
import AdaptiveLearningWidgetNoData from "./AdaptiveLearningWidgetNoData";
import React from "react";
import { screen } from "@testing-library/react";

describe(`AdaptiveLearningWidgetNoData`, () => {
    describe(`Render`, () => {
        test(`AdaptiveLearningWidgetNoData renders correctly`, () => {
            render(<AdaptiveLearningWidgetNoData />);
            
            expect(screen.queryByText(`Learning Boost`)).toBeInTheDocument();
            expect(screen.queryByText(`Total Auto Reviews`)).toBeInTheDocument();
            expect(screen.queryByText(`Skills Improved`)).toBeInTheDocument();
            expect(screen.queryByText(`Skills`)).toBeInTheDocument();
            expect(screen.queryByText(`Classes`)).toBeInTheDocument();
            expect(screen.queryByText(`With Review`)).toBeInTheDocument();
            expect(screen.queryByText(`Without Auto Review`)).toBeInTheDocument();
            expect(screen.queryByText(`Top 3 improved skills`)).toBeInTheDocument();
            expect(screen.queryByText(`Keep track of how much your skills are improving with adaptive learning`)).toBeInTheDocument();
        });
    });
});