import render from "../../../../tests/utils/render";
import CompletionWidget from "./CompletionWidget";
import { defaultContext as defaultWidgetContext } from "../../models/widgetContext";
import React from "react";

describe(`CompletionWidget`, () => {
    describe(`Render`, () => {
        test(`Completion widget renders correctly`, () => {
            render((
                <CompletionWidget
                    widgetContext={defaultWidgetContext}
                />
            ));
        });
    });
});