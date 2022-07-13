import render from "../../../../../tests/utils/render";
import TeacherLoadNoData from "./TeacherLoadNoData";
import React from "react";
import { screen } from "@testing-library/react";

describe(`TeacherLoadNoData`, () => {
    describe(`Render`, () => {
        test(`TeacherLoadNoData renders correctly`, () => {
            render(<TeacherLoadNoData />);
            
            expect(screen.queryByText(`Add classes and class rosters to keep track of your load.`)).toBeInTheDocument();
            expect(screen.queryByText(`List`)).toBeInTheDocument();
            expect(screen.queryByText(`Last Update`)).toBeInTheDocument();
            expect(screen.queryByText(`Total Classes`)).toBeInTheDocument();
            expect(screen.queryByText(`Total Students`)).toBeInTheDocument();
            expect(screen.queryByText(`Upcoming Classes`)).toBeInTheDocument();
            expect(screen.queryByText(`Next 7 days`)).toBeInTheDocument();
        });
    });
});