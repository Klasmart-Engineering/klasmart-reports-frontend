import render from "../../../../../tests/utils/render";
import ContentStatusNoData from "./ContentStatusNoData";
import React from "react";
import { screen } from "@testing-library/react";

describe(`ContentStatusNoData`, () => {
    describe(`Render`, () => {
        test(`ContentStatusNoData renders correctly`, () => {
            render(<ContentStatusNoData />);
            
            expect(screen.getByText("Create lesson plan")).toBeInTheDocument();
            expect(screen.getByText("Learning Material")).toBeInTheDocument();
            expect(screen.getByText("Total Approved")).toBeInTheDocument();
            expect(screen.getByText("Total Pending")).toBeInTheDocument();
            expect(screen.getByText("Total Rejected")).toBeInTheDocument();
        });
    });
});
