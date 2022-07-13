import render from "../../../../tests/utils/render";
import AchievementWidget from "./AchievementWidget";
import { defaultContext as defaultWidgetContext } from "../../models/widgetContext";
import React from "react";

describe(`AchievementWidget`, () => {
    describe(`Render`, () => {
        test(`Achievement widget renders correctly`, () => {
            render((
                <AchievementWidget
                    widgetContext={defaultWidgetContext}
                />
            ));
        });
    });
});
