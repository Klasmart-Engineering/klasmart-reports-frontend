import render from "../../../../../tests/utils/render";
import Popup, { PopupProps } from "./Popup";
import adaptiveLearningJourneyMockData from "../utilities";
import { screen } from "@testing-library/react";
import React from "react";

describe(`Popup`, () => {

    const defaultProps: PopupProps = {
        handlePopup: jest.fn(),
        selectedAssesmentType : `live`,
        selectedAssesment : adaptiveLearningJourneyMockData[0],
        isVerticalMode : false,
        open: true,
    }

    describe(`Render`, () => {
        test(`Popup`, () => {
            render(<Popup {...defaultProps}/>);

            expect(screen.getByText("Live")).toBeInTheDocument();
            expect(screen.getByText("A Christmas Safari")).toBeInTheDocument();
            expect(screen.getByText("Christina")).toBeInTheDocument();
            expect(screen.getByText("Michael")).toBeInTheDocument();
            expect(screen.getByText("Reading")).toBeInTheDocument();
            expect(screen.getByText("Speaking")).toBeInTheDocument();
            expect(screen.getByText("Writing")).toBeInTheDocument();
        });
    });
});
