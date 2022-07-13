import render from "../../../../tests/utils/render";
import PendingAssessments from "./PendingAssessments";
import { defaultContext as defaultWidgetContext } from "../../models/widgetContext";
import React from "react";

describe(`PendingAssessments`, () => {
    describe(`Render`, () => {
        test(`Pending Assessments widget renders correctly`, () => {
            render((
                <PendingAssessments
                    widgetContext={defaultWidgetContext}
                />
            ));
        });
    });
});