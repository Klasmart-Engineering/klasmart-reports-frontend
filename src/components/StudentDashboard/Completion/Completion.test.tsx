import render from "../../../../tests/utils/render";
import CompletionWidget from "./CompletionWidget";
import { defaultContext as defaultWidgetContext } from "../../models/widgetContext";
import { studentAssignmentCompletionMockData } from "../../../../tests/widgetsMockData";
import { screen } from "@testing-library/react";
import React from "react";


jest.mock(`@kl-engineering/reports-api-client`, () => {
    return {
        ...jest.requireActual(`@kl-engineering/reports-api-client`),
    };
});

const reportsApi = require("@kl-engineering/reports-api-client");
reportsApi.useGetStudentAssignmentCompletion = jest.fn() as jest.Mock;

describe(`CompletionWidget`, () => {

    describe(`Render`, () => {
        test(`Completion widget without error`, () => {
            reportsApi.useGetStudentAssignmentCompletion = (() => ({
                data: studentAssignmentCompletionMockData,
                isLoading: false,
                isSuccess: true,
                refetch: jest.fn(),
            }));

            render((
                <CompletionWidget
                    widgetContext={defaultWidgetContext}
                />
            ));

            expect(screen.getByText(`83%`)).toBeInTheDocument();
            expect(screen.getByText(`17%`)).toBeInTheDocument();
            expect(screen.getByText(6)).toBeInTheDocument();
            expect(screen.getByText(5)).toBeInTheDocument();
            expect(screen.getByText(1)).toBeInTheDocument();
        });

        test(`Completion widget with error`, () => {
            reportsApi.useGetStudentAssignmentCompletion = (() => ({
                data: studentAssignmentCompletionMockData,
                isLoading: false,
                isSuccess: false,
                refetch: jest.fn(),
            }));

            render((
                <CompletionWidget
                    widgetContext={defaultWidgetContext}
                />
            ));

            expect(screen.getByText("Oops!")).toBeInTheDocument();
            expect(screen.getByText("The data cannot be loaded, please try again later!")).toBeInTheDocument();
            expect(screen.getByText("Try Again")).toBeInTheDocument();
        });

        test(`Completion widget when there's no data`, () => {
            reportsApi.useGetStudentAssignmentCompletion = (() => ({
                data: {
                    ...studentAssignmentCompletionMockData,
                    successful: false,
                },
                isLoading: false,
                isSuccess: true,
                refetch: jest.fn(),
            }));

            render((
                <CompletionWidget
                    widgetContext={defaultWidgetContext}
                />
            ));

            expect(screen.getByText(`Get a summary of the completion status of all assignments from your teacher`)).toBeInTheDocument();
            expect(screen.getByText(`This week`)).toBeInTheDocument();
            expect(screen.getByText(`Total assignment`)).toBeInTheDocument();
        });
    });
});
