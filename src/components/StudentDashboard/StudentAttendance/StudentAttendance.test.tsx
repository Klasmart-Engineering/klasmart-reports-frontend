import render from "../../../../tests/utils/render";
import StudentAttendance from "./StudentAttendance";
import { defaultContext as defaultWidgetContext } from "../../models/widgetContext";
import { studentAttendanceMockData } from "../../../../tests/widgetsMockData";
import { screen } from "@testing-library/react";
import React from "react";

jest.mock(`@kl-engineering/reports-api-client`, () => {
    return {
        ...jest.requireActual(`@kl-engineering/reports-api-client`),
    };
});

const reportsApi = require("@kl-engineering/reports-api-client") ;
reportsApi.useGetStudentAttendanceRate = jest.fn() as jest.Mock;

describe(`StudentAttendance`, () => {

    describe(`Render`, () => {
        test(`Student Attendance widget without error`, () => {
            reportsApi.useGetStudentAttendanceRate = (() => ({
                data: studentAttendanceMockData,
                isFetching: false,
                isSuccess: true,
                refetch: jest.fn(),
            }));
            
            render((
                <StudentAttendance
                    widgetContext={defaultWidgetContext}
                />
            ));

            expect(screen.getByText("Average attendance for 1 week")).toBeInTheDocument();
            expect(screen.getByText("66%")).toBeInTheDocument();
        });

        test(`Student Attendance widget with error`, () => {
            reportsApi.useGetStudentAttendanceRate = (() => ({
                data: studentAttendanceMockData,
                isFetching: false,
                isSuccess: false,
                refetch: jest.fn(),
            }));
            
            render((
                <StudentAttendance
                    widgetContext={defaultWidgetContext}
                />
            ));

            expect(screen.getByText("Oops!")).toBeInTheDocument();
            expect(screen.getByText("The data cannot be loaded, please try again later!")).toBeInTheDocument();
            expect(screen.getByText("Try Again")).toBeInTheDocument();
        });

        test(`Student Attendance widget when there's no data`, () => {
            reportsApi.useGetStudentAttendanceRate = (() => ({
                data: { 
                    ...studentAttendanceMockData,
                    successful: false,
                },
                isFetching: false,
                isSuccess: true,
                refetch: jest.fn(),
            }));
            
            render((
                <StudentAttendance
                    widgetContext={defaultWidgetContext}
                />
            ));

            expect(screen.getByText("Monitor your attendance within a two weeks period.")).toBeInTheDocument();
            expect(screen.getByText("Average attendance for 1 week")).toBeInTheDocument();
        });
    });
});
