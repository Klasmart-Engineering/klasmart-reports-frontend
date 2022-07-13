import render from "../../../../tests/utils/render";
import LearningOutcomeSummary from "./LearningOutcomeSummary";
import { defaultContext as defaultWidgetContext } from "../../models/widgetContext";
import React from "react";

describe(`LearningOutcomeSummary`, () => {
    describe(`Render`, () => {
        test(`Learning Outcome Summary widget renders correctly`, () => {
            render((
                <LearningOutcomeSummary
                    widgetContext={defaultWidgetContext}
                />
            ));
        });
    });
});
