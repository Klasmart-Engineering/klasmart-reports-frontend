import render from "tests/utils/render";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListItem from "./ListItem"
import React from "react";

describe(`ListItem`, () => {

    const defaultProps = {
        title: `Title`,
    }

    describe(`Render`, () => {
        test(`default props`, () => {
            render(<ListItem {...defaultProps} />);

            const titleEl = screen.getByText(defaultProps.title);
            
            expect(titleEl).toHaveTextContent(defaultProps.title);
        })

        test(`subtitle`, () => {
            const mockedSubtitle = `Subtitle`;
            render((
                <ListItem
                    {...defaultProps}
                    subtitle={mockedSubtitle}
                />
            ));
            
            const titleEl = screen.getByText(mockedSubtitle);
            
            expect(titleEl).toHaveTextContent(mockedSubtitle);
        });
    });

    describe(`Interact`, () => {
        test(`onClick`, () => {
            const mockedOnClick = jest.fn();
            render((
                <ListItem
                    {...defaultProps}
                    onClick={mockedOnClick}
                />
            ));

            const listItemEl = screen.getByRole(`listitem`);
            userEvent.click(listItemEl);

            expect(mockedOnClick).toHaveBeenCalledTimes(1);
        });
    });
});
