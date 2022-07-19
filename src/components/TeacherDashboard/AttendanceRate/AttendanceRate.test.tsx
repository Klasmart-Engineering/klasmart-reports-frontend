import render from "../../../../tests/utils/render";
import AttendanceRate from "./AttendanceRate";
import { BaseWidgetProps } from "../../models/widget.model";
import { teacherAttendanceMockData } from "../../../../tests/widgetsMockData";
import { screen } from "@testing-library/react";
import React from "react";

jest.mock(`@kl-engineering/reports-api-client`, () => {
    return {
        ...jest.requireActual(`@kl-engineering/reports-api-client`),
    };
});

const reportsApi = require("@kl-engineering/reports-api-client") ;
reportsApi.useGetClassAttendanceRateGroup = jest.fn() as jest.Mock;

describe(`AttendanceRate`, () => {
    
    describe(`Render`, () => {
        
        const defaultProps: BaseWidgetProps = {
            editing: false,
            onRemove: jest.fn(),
        }

        test(`Attendance Rate widget without error`, () => {
            reportsApi.useGetClassAttendanceRateGroup = (() => ({
                data: teacherAttendanceMockData,
                isFetching: false,
                isSuccess: true,
                refetch: jest.fn(),
            }));

            render(<AttendanceRate {...defaultProps}/>);

            expect(screen.getByText("Last 7 days")).toBeInTheDocument();
            expect(screen.getByText("Students with low attendance")).toBeInTheDocument();
            expect(screen.getByText("High attendance")).toBeInTheDocument();
            expect(screen.getByText("Medium attendance")).toBeInTheDocument();
            expect(screen.getByText("Low attendance")).toBeInTheDocument();
            expect(screen.getByText("60%")).toBeInTheDocument();
            expect(screen.getAllByText("20%"));
        });

        test(`Attendance Rate widget with error`, () => {
            reportsApi.useGetClassAttendanceRateGroup = (() => ({
                data: teacherAttendanceMockData,
                isFetching: false,
                isSuccess: false,
                refetch: jest.fn(),
            }));

            render(<AttendanceRate {...defaultProps}/>);

            expect(screen.getByText("Oops!")).toBeInTheDocument();
            expect(screen.getByText("The data cannot be loaded, please try again later!")).toBeInTheDocument();
            expect(screen.getByText("Try Again")).toBeInTheDocument();
        });

        test(`Attendance Rate widget when there's no data`, () => {
            reportsApi.useGetClassAttendanceRateGroup = (() => ({
                data: { 
                    ...teacherAttendanceMockData,
                    successful: false,
                },
                isFetching: false,
                isSuccess: true,
                refetch: jest.fn(),
            }));

            render(<AttendanceRate {...defaultProps}/>);

            expect(screen.getByText("High attendance")).toBeInTheDocument();
            expect(screen.getByText("Medium attendance")).toBeInTheDocument();
            expect(screen.getByText("Low attendance")).toBeInTheDocument();
            expect(screen.getByText("Run and conduct classes to view students' attendance over a period of seven days.")).toBeInTheDocument();
            expect(screen.getByText("Last 7 days")).toBeInTheDocument();
        });
    });
});
