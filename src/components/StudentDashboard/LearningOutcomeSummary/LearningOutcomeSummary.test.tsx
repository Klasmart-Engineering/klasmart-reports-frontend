import render from "../../../../tests/utils/render";
import LearningOutcomeSummary from "./LearningOutcomeSummary";
import { BaseWidgetProps } from "../../models/widget.model";
import { studentLearningOutcomeSummaryMockData } from "../../../../tests/widgetsMockData";
import { screen } from "@testing-library/react";
import React from "react";

jest.mock(`@kl-engineering/reports-api-client`, () => {
    return {
        ...jest.requireActual(`@kl-engineering/reports-api-client`),
    };
});

const reportsApi = require("@kl-engineering/reports-api-client") ;
reportsApi.useGetStudentLearningOutcome = jest.fn() as jest.Mock;

describe(`LearningOutcomeSummary`, () => {

    describe(`Render`, () => {

        const defaultProps: BaseWidgetProps = {
            editing: false,
            onRemove: jest.fn(),
        }

        test(`Learning Outcome Summary widget without error`, () => {
            reportsApi.useGetStudentLearningOutcome = (() => ({
                data: studentLearningOutcomeSummaryMockData,
                isLoading: false,
                isSuccess: true,
                refetch: jest.fn(),
            }));
            
            render(<LearningOutcomeSummary {...defaultProps}/>);

            expect(screen.getByText(39)).toBeInTheDocument();
            expect(screen.getByText(25)).toBeInTheDocument();
            expect(screen.getByText(9)).toBeInTheDocument();
            expect(screen.getByText(26)).toBeInTheDocument();
            expect(screen.getByText(18)).toBeInTheDocument();
            expect(screen.getByText(7)).toBeInTheDocument();
            expect(screen.getByText("Speech & Language Skills")).toBeInTheDocument();
            expect(screen.getByText("Motor Skills")).toBeInTheDocument();
            expect(screen.getByText("Cognitive Skills")).toBeInTheDocument();
        });

        test(`Learning Outcome Summary widget with error`, () => {
            reportsApi.useGetStudentLearningOutcome = (() => ({
                data: studentLearningOutcomeSummaryMockData,
                isLoading: false,
                isSuccess: false,
                refetch: jest.fn(),
            }));
            
            render(<LearningOutcomeSummary {...defaultProps}/>);

            expect(screen.getByText("Oops!")).toBeInTheDocument();
            expect(screen.getByText("The data cannot be loaded, please try again later!")).toBeInTheDocument();
            expect(screen.getByText("Try Again")).toBeInTheDocument();
        });

        test(`Learning Outcome Summary widget when there's no data`, () => {
            reportsApi.useGetStudentLearningOutcome = (() => ({
                data: {
                    ...studentLearningOutcomeSummaryMockData,
                    successful: false,
                },
                isLoading: false,
                isSuccess: true,
                refetch: jest.fn(),
            }));
            
            render(<LearningOutcomeSummary {...defaultProps}/>);

            expect(screen.getByText("Cognitive Skill")).toBeInTheDocument();
            expect(screen.getByText("Physical")).toBeInTheDocument();
            expect(screen.getByText("Emotional")).toBeInTheDocument();
            expect(screen.getByText("Social")).toBeInTheDocument();
            expect(screen.getByText("Gross Motor Skills")).toBeInTheDocument();
            expect(screen.getByText("You will see your top 5 skill areas from the last 7 days.")).toBeInTheDocument();
        });
    });
});
