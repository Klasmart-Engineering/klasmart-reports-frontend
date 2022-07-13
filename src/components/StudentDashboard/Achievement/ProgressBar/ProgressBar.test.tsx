import render from "../../../../../tests/utils/render";
import { screen } from "@testing-library/react";
import ProgressBar, { ProgressBarProps } from "./ProgressBar";
import React from "react";

describe(`ProgressBar`, () => {

    const defaultProps: ProgressBarProps = {
        total: 100,
        progress: 50,
    }

    describe(`Render`, () => {
        test(`defaultProps`, () => {
            render(<ProgressBar {...defaultProps}/>);
        });

        test(`color`, () => {
            const mockColor = "black";
            render((
                <ProgressBar 
                    {...defaultProps}
                    color={mockColor}
                />
            ));
        });

        test(`backgroundColor`, () => {
            const mockColor = "black";
            render((
                <ProgressBar 
                    {...defaultProps}
                    backgroundColor={mockColor}
                />
            ));
        });

        test(`thickness`, () => {
            const mockThickness = 5;
            render((
                <ProgressBar 
                    {...defaultProps}
                    thickness={mockThickness}
                />
            ));
        });
    });
});
