import render from "../../../../tests/utils/render";
import AdaptiveLearningWidget from "./AdaptiveLearningWidget";
import { defaultContext as defaultWidgetContext } from "../../models/widgetContext";
import React from "react";

describe(`AdaptiveLearningWidget`, () => {
    describe(`Render`, () => {
        test(`Adaptive Learning widget renders correctly`, () => {
            render((
                <AdaptiveLearningWidget
                    widgetContext={defaultWidgetContext}
                />
            ));
        });
    });
});
