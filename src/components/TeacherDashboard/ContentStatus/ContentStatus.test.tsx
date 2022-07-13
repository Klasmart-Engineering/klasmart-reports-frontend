import render from "../../../../tests/utils/render";
import ContentStatus from "./ContentStatus";
import { defaultContext as defaultWidgetContext } from "../../models/widgetContext";
import React from "react";

describe(`ContentStatus`, () => {
    describe(`Render`, () => {
        test(`Content Status widget renders correctly`, () => {
            render((
                <ContentStatus
                    widgetContext={defaultWidgetContext}
                />
            ));
        });
    });
});
