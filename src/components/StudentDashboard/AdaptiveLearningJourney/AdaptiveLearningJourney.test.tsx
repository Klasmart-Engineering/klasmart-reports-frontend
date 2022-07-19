import render from "../../../../tests/utils/render";
import AdaptiveLearningJourney from "./AdaptiveLearningJourney";
import { BaseWidgetProps } from "../../models/widget.model";
import React from "react";

describe(`AdaptiveLearningJourney`, () => {
    describe(`Render`, () => {
        
        const defaultProps: BaseWidgetProps = {
            editing: false,
            onRemove: jest.fn(),
        }

        test(`Adaptive Learning Journey widget renders correctly`, () => {
            render(<AdaptiveLearningJourney {...defaultProps}/>);
        });
    });
});
