import render from "../../../../tests/utils/render";
import TeacherLoadWidget from "./TeacherLoadWidget";
import { BaseWidgetProps } from "../../models/widget.model";
import { screen } from "@testing-library/react";
import { teacherLoadSchedulesMockData, teacherLoadTeacherMockData } from "../../../../tests/widgetsMockData";
import React from "react";

jest.mock(`@kl-engineering/reports-api-client`, () => {
    return {
        ...jest.requireActual(`@kl-engineering/reports-api-client`),
    };
});
jest.mock(`@kl-engineering/cms-api-client`, () => {
    return {
        ...jest.requireActual(`@kl-engineering/cms-api-client`),
    };
});

const cmsApi = require("@kl-engineering/cms-api-client") ;
const reportsApi = require("@kl-engineering/reports-api-client") ;

reportsApi.useClassTeacherLoad = jest.fn() as jest.Mock;
cmsApi.usePostSchedulesTimeViewList = jest.fn() as jest.Mock;

describe(`TeacherLoadWidget`, () => {

    describe(`Render`, () => {
        
        const defaultProps: BaseWidgetProps = {
            editing: false,
            onRemove: jest.fn(),
        }

        test(`Teacher Load widget without error`, () => {
            reportsApi.useClassTeacherLoad = (() => ({
                data: teacherLoadTeacherMockData,
                isFetching: false,
                isSuccess: true,
                refetch: jest.fn(),
            }));
            cmsApi.usePostSchedulesTimeViewList = (() => ({
                data: teacherLoadSchedulesMockData,
                isFetching: false,
                isSuccess: true,
                refetch: jest.fn(),
            }));

            render(<TeacherLoadWidget {...defaultProps}/>);

            expect(screen.getByText("Total Classes")).toBeInTheDocument();
            expect(screen.getByText("Total Students")).toBeInTheDocument();
            expect(screen.getByText("Upcoming Classes")).toBeInTheDocument();
            expect(screen.getByText("Next 7 days")).toBeInTheDocument();
            expect(screen.getAllByText("All time"));
        });

        test(`Teacher Load widget with error`, () => {
            reportsApi.useClassTeacherLoad = (() => ({
                data: teacherLoadTeacherMockData,
                isFetching: false,
                isSuccess: false,
                refetch: jest.fn(),
            }));
            cmsApi.usePostSchedulesTimeViewList = (() => ({
                data: null,
                isFetching: false,
                isSuccess: false,
                refetch: jest.fn(),
            }));

            render(<TeacherLoadWidget {...defaultProps}/>);

            expect(screen.getByText("Oops!")).toBeInTheDocument();
            expect(screen.getByText("The data cannot be loaded, please try again later!")).toBeInTheDocument();
            expect(screen.getByText("Try Again")).toBeInTheDocument();
        });

        test(`Teacher Load widget when there's no data`, () => {
            reportsApi.useClassTeacherLoad = (() => ({
                data: { 
                    ...teacherLoadTeacherMockData,
                    successful: false,
                },
                isFetching: false,
                isSuccess: true,
                refetch: jest.fn(),
            }));
            cmsApi.usePostSchedulesTimeViewList = (() => ({
                data: {
                    ...teacherLoadSchedulesMockData,
                    data: [],
                },
                isFetching: false,
                isSuccess: true,
                refetch: jest.fn(),
            }));

            render(<TeacherLoadWidget {...defaultProps}/>);

            expect(screen.getByText(`Add classes and class rosters to keep track of your load.`)).toBeInTheDocument();
            expect(screen.getByText(`List`)).toBeInTheDocument();
            expect(screen.getByText(`Last Update`)).toBeInTheDocument();
            expect(screen.getByText(`Total Classes`)).toBeInTheDocument();
            expect(screen.getByText(`Total Students`)).toBeInTheDocument();
            expect(screen.getByText(`Upcoming Classes`)).toBeInTheDocument();
            expect(screen.getByText(`Next 7 days`)).toBeInTheDocument();
        });
    });
});
