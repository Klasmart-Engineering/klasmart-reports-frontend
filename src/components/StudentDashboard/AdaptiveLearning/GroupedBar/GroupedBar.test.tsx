import render from "../../../../../tests/utils/render";
import GroupedBar, { GroupedBarProps } from "./GroupedBar";
import React from "react";

const mockedData = [
    {
        skill: `Writing`,
        WithoutReview: 64,
        WithReview: 83,
    },
    {
        skill: `Reading`,
        WithoutReview: 56,
        WithReview: 100,
    },
    {
        skill: `Listening`,
        WithoutReview: 32,
        WithReview: 68,
    },
];

describe(`GroupedBar`, () => {

    const defaultProps: GroupedBarProps = {
        data: mockedData,
        width: 100,
        height: 100,
        colorRange: [`black`, `white`],
        windowWidth: 50,
    }

    describe(`Render`, () => {
        test(`defaultProps`, () => {
            render(<GroupedBar {...defaultProps}/>);
        });
    });
});
