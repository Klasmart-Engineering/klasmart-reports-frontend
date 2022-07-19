import render from "../../../../tests/utils/render";
import ContentStatus from "./ContentStatus";
import { BaseWidgetProps } from "../../models/widget.model";
import { screen } from "@testing-library/react";
import { teacherContentStatusMockData } from "../../../../tests/widgetsMockData";
import React from "react";


jest.mock(`@kl-engineering/reports-api-client`, () => {
    return {
        ...jest.requireActual(`@kl-engineering/reports-api-client`),
    };
});

const reportsApi = require("@kl-engineering/reports-api-client") ;
reportsApi.useGetContentTeacher = jest.fn() as jest.Mock;

describe(`ContentStatus`, () => {

    describe(`Render`, () => {
        
        const defaultProps: BaseWidgetProps = {
            editing: false,
            onRemove: jest.fn(),
        }

        test(`Content Status widget without error`, () => {
            reportsApi.useGetContentTeacher = (() => ({
                data: teacherContentStatusMockData,
                isFetching: false,
                isSuccess: true,
                refetch: jest.fn(),
            }));

            render(<ContentStatus {...defaultProps}/>);

            expect(screen.getByText("Learning Material")).toBeInTheDocument();
            expect(screen.getByText("Total Approved")).toBeInTheDocument();
            expect(screen.getByText("Total Pending")).toBeInTheDocument();
            expect(screen.getByText("Total Rejected")).toBeInTheDocument();
            expect(screen.getAllByText("All time"));
        });

        test(`Content Status widget with error`, () => {
            reportsApi.useGetContentTeacher = (() => ({
                data: teacherContentStatusMockData,
                isFetching: false,
                isSuccess: false,
                refetch: jest.fn(),
            }));

            render(<ContentStatus {...defaultProps}/>);

            expect(screen.getByText("Oops!")).toBeInTheDocument();
            expect(screen.getByText("The data cannot be loaded, please try again later!")).toBeInTheDocument();
            expect(screen.getByText("Try Again")).toBeInTheDocument();
        });

        test(`Content Status widget when there's no data`, () => {
            reportsApi.useGetContentTeacher = (() => ({
                data: { 
                    ...teacherContentStatusMockData,
                    successful: false,
                },
                isFetching: false,
                isSuccess: true,
                refetch: jest.fn(),
            }));

            render(<ContentStatus {...defaultProps}/>);

            expect(screen.getByText("Create lesson plan")).toBeInTheDocument();
            expect(screen.getByText("Learning Material")).toBeInTheDocument();
            expect(screen.getByText("Total Approved")).toBeInTheDocument();
            expect(screen.getByText("Total Pending")).toBeInTheDocument();
            expect(screen.getByText("Total Rejected")).toBeInTheDocument();
        });
    });
});
