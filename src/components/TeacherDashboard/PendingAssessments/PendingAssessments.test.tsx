import render from "../../../../tests/utils/render";
import PendingAssessments from "./PendingAssessments";
import { BaseWidgetProps } from "../../models/widget.model";
import { screen } from "@testing-library/react";
import { teacherPendingAssessmentsMockData } from "../../../../tests/widgetsMockData";
import React from "react";


jest.mock(`@kl-engineering/reports-api-client`, () => {
    return {
        ...jest.requireActual(`@kl-engineering/reports-api-client`),
    };
});

const reportsApi = require("@kl-engineering/reports-api-client") ;
reportsApi.useGetPendingAssignments = jest.fn() as jest.Mock;

describe(`PendingAssessments`, () => {

    describe(`Render`, () => {
        
        const defaultProps: BaseWidgetProps = {
            editing: false,
            onRemove: jest.fn(),
        }

        test(`Pending Assessments widget without error`, () => {
            reportsApi.useGetPendingAssignments = (() => ({
                data: teacherPendingAssessmentsMockData,
                isFetching: false,
                isSuccess: true,
                refetch: jest.fn(),
            }));

            render(<PendingAssessments {...defaultProps}/>);

            expect(screen.getByText("All time")).toBeInTheDocument();
            expect(screen.getByText("Live")).toBeInTheDocument();
            expect(screen.getByText("Class")).toBeInTheDocument();
            expect(screen.getByText("Home Fun")).toBeInTheDocument();
            expect(screen.getByText("Study")).toBeInTheDocument();
        });

        test(`Pending Assessments widget with error`, () => {
            reportsApi.useGetPendingAssignments = (() => ({
                data: teacherPendingAssessmentsMockData,
                isFetching: false,
                isSuccess: false,
                refetch: jest.fn(),
            }));

            render(<PendingAssessments {...defaultProps}/>);

            expect(screen.getByText("Oops!")).toBeInTheDocument();
            expect(screen.getByText("The data cannot be loaded, please try again later!")).toBeInTheDocument();
            expect(screen.getByText("Try Again")).toBeInTheDocument();
        });

        test(`Pending Assessments widget when there's no data`, () => {
            reportsApi.useGetPendingAssignments = (() => ({
                data: { 
                    ...teacherPendingAssessmentsMockData,
                    successful: false,
                },
                isFetching: false,
                isSuccess: true,
                refetch: jest.fn(),
            }));

            render(<PendingAssessments {...defaultProps}/>);

            expect(screen.getByText("Schedule classes to start an assessment of your students.")).toBeInTheDocument();
            expect(screen.getByText("Schedule a class")).toBeInTheDocument();
            expect(screen.getByText("All time")).toBeInTheDocument();
            expect(screen.getByText("Class Type")).toBeInTheDocument();
            expect(screen.getByText("Assessments to complete")).toBeInTheDocument();
        });
    });
});
