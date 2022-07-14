import render from "../../../../tests/utils/render";
import AchievementWidget from "./AchievementWidget";
import { defaultContext as defaultWidgetContext } from "../../models/widgetContext";
import { screen } from "@testing-library/react";
import { studentAcheivementMockData } from "../../../../tests/widgetsMockData";
import React from "react";

jest.mock(`@kl-engineering/reports-api-client`, () => {
    return {
        ...jest.requireActual(`@kl-engineering/reports-api-client`),
    };
});

const reportsApi = require("@kl-engineering/reports-api-client");
reportsApi.useGetStudentLearningOutcome = jest.fn() as jest.Mock;

describe(`AchievementWidget`, () => {
    
    describe(`Render`, () => {
        beforeEach(() => jest.resetModules());
        test(`Achievement widget without error`, () => {
            reportsApi.useGetStudentLearningOutcome = (() => ({
                data: studentAcheivementMockData,
                isFetching: false,
                isSuccess: true,
                refetch: jest.fn(),
            }));

            render((
                <AchievementWidget
                    widgetContext={defaultWidgetContext}
                />
            ));

            expect(screen.getByText(20)).toBeInTheDocument();
            expect(screen.getByText(40)).toBeInTheDocument();
            expect(screen.getByText(15)).toBeInTheDocument();
            expect(screen.getByText("Achieved")).toBeInTheDocument();
            expect(screen.getByText("Pending")).toBeInTheDocument();
            expect(screen.getByText("Not Achieved")).toBeInTheDocument();
        });

        test(`Achievement widget with error`, () => {
            reportsApi.useGetStudentLearningOutcome = (() => ({
                data: studentAcheivementMockData,
                isFetching: false,
                isSuccess: false,
                refetch: jest.fn(),
            }));

            render((
                <AchievementWidget
                    widgetContext={defaultWidgetContext}
                />
            ));

            expect(screen.getByText("Oops!")).toBeInTheDocument();
            expect(screen.getByText("The data cannot be loaded, please try again later!")).toBeInTheDocument();
            expect(screen.getByText("Try Again")).toBeInTheDocument();
        });
    });
});
