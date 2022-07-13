import render from "../../../tests/utils/render";
import { screen } from "@testing-library/react";
import NoDataMessageWrapper, { NoDataMessageWrapperProps } from "./NoDataMessageWrapper";
import React from "react";

describe(`NoDataMessageWrapper`, () => {

    const defaultProps: NoDataMessageWrapperProps = {
        id: "noDataMessage.test"
    }

    describe(`Render`, () => {
        test(`defaultProps`, () => {
            render(<NoDataMessageWrapper {...defaultProps} />);

            const messageEl = screen.getByText(`No Data Message`);
            expect(messageEl).toHaveTextContent(`No Data Message`);
        });

        test(`backdrop`, () => {
            render((
                <NoDataMessageWrapper
                    {...defaultProps}
                    backdrop={true}
                />
            ));

            const sampleEl = screen.getByText(`Sample`);
            expect(sampleEl).toHaveTextContent(`Sample`);
        });

        test(`buttonLink`, () => {

            const mockButtonProps = {
                buttonLink: "/testLink",
                buttonName: "Test Button"
            }

            render((
                <NoDataMessageWrapper
                    {...defaultProps}
                    {...mockButtonProps}
                />
            ));

            const buttonEl = screen.getByRole(`button`);
            expect(buttonEl).toHaveTextContent(mockButtonProps.buttonName);
        });
    });
});
