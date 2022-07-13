import render from "../../../../../tests/utils/render";
import PendingAssessmentsNoData from "./PendingAssessmentsNoData";
import React from "react";
import { screen } from "@testing-library/react";

describe(`PendingAssessmentsNoData`, () => {
    describe(`Render`, () => {
        test(`PendingAssessmentsNoData renders correctly`, () => {
            render(<PendingAssessmentsNoData />);
            
            expect(screen.getByText("Schedule classes to start an assessment of your students.")).toBeInTheDocument();
            expect(screen.getByText("Schedule a class")).toBeInTheDocument();
            expect(screen.getByText("All time")).toBeInTheDocument();
            expect(screen.getByText("Class Type")).toBeInTheDocument();
            expect(screen.getByText("Assessments to complete")).toBeInTheDocument();
        });
    });
});
