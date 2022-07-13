import render from "../../../../tests/utils/render";
import AttendanceRate from "./AttendanceRate";
import { defaultContext as defaultWidgetContext } from "../../models/widgetContext";
import React from "react";

describe(`AttendanceRate`, () => {
    describe(`Render`, () => {
        test(`Attendance Rate widget renders correctly`, () => {
            render((
                <AttendanceRate
                    widgetContext={defaultWidgetContext}
                />
            ));
        });

    });
});