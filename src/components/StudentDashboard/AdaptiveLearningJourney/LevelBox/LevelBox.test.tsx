import render from "../../../../../tests/utils/render";
import LevelBox, { LevelBoxProps } from "./LevelBox";
import adaptiveLearningJourneyMockData from "../utilities";
import React from "react";

describe(`LevelBox`, () => {

    const defaultProps: LevelBoxProps = {
        data: adaptiveLearningJourneyMockData[0],
        currentLevel: adaptiveLearningJourneyMockData[0],
        booster: false,
        handlePopup: jest.fn(),
    }

    describe(`Render`, () => {
        test(`defaultProps`, () => {
            render(<LevelBox {...defaultProps}/>);
        });
    });
});
