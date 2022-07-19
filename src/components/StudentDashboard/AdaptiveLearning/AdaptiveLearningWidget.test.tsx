import render from "../../../../tests/utils/render";
import AdaptiveLearningWidget from "./AdaptiveLearningWidget";
import { BaseWidgetProps } from "../../models/widget.model";
import React from "react";

describe(`AdaptiveLearningWidget`, () => {
    describe(`Render`, () => {

        const defaultProps: BaseWidgetProps = {
            editing: false,
            onRemove: jest.fn(),
        }

        test(`Adaptive Learning widget renders correctly`, () => {
            render(<AdaptiveLearningWidget {...defaultProps}/>);
        });
    });
});
