import render from "../../../../../tests/utils/render";
import StudentAttendanceNoData from "./StudentAttendanceNoData";
import React from "react";
import { screen } from "@testing-library/react";

describe(`StudentAttendanceNoData`, () => {
    describe(`Render`, () => {
        test(`StudentAttendanceNoData renders correctly`, () => {
            render(<StudentAttendanceNoData />);
            
            expect(screen.getByText("Monitor your attendance within a two weeks period.")).toBeInTheDocument();
            expect(screen.getByText("Average attendance for 1 week")).toBeInTheDocument();
        });
    });
});
