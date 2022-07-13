import render from "../../../tests/utils/render";
import WidgetWrapperError from "./WidgetWrapperError";
import React from "react";
import { screen } from "@testing-library/react";

describe(`WidgetWrapperError`, () => {
    describe(`Render`, () => {
        test(`WidgetWrapperError renders correctly`, () => {
            const reload = jest.fn();
            render(<WidgetWrapperError reload={reload}/>);
            
            expect(screen.getByText("Oops!")).toBeInTheDocument();
            expect(screen.getByText("The data cannot be loaded, please try again later!")).toBeInTheDocument();
            expect(screen.getByText("Try Again")).toBeInTheDocument();
        });
    });
});
