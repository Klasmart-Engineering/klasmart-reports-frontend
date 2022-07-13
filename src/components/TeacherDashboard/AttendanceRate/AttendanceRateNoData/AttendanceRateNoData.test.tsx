import render from "../../../../../tests/utils/render";
import AttendanceRateNoData from "./AttendanceRateNoData";
import React from "react";
import { screen } from "@testing-library/react";

describe(`AttendanceRateNoData`, () => {
    describe(`Render`, () => {
        test(`AttendanceRateNoData renders correctly`, () => {
            render(<AttendanceRateNoData />);
            
            expect(screen.getByText("High attendance")).toBeInTheDocument();
            expect(screen.getByText("Medium attendance")).toBeInTheDocument();
            expect(screen.getByText("Low attendance")).toBeInTheDocument();
            expect(screen.getByText("Run and conduct classes to view students' attendance over a period of seven days.")).toBeInTheDocument();
            expect(screen.getByText("Last 7 days")).toBeInTheDocument();
        });
    });
});
