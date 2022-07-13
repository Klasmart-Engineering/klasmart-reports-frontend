import render from "../../../../tests/utils/render";
import AdaptiveLearningJourney from "./AdaptiveLearningJourney";
import { defaultContext as defaultWidgetContext } from "../../models/widgetContext";
import React from "react";

describe(`AdaptiveLearningJourney`, () => {
    describe(`Render`, () => {
        test(`Adaptive Learning Journey widget renders correctly`, () => {
            render((
                <AdaptiveLearningJourney
                    widgetContext={defaultWidgetContext}
                />
            ));
        });
    });
});
