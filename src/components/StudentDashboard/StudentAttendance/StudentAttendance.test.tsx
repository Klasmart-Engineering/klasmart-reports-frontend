import render from "../../../../tests/utils/render";
import StudentAttendance from "./StudentAttendance";
import { defaultContext as defaultWidgetContext } from "../../models/widgetContext";
import React from "react";

describe(`StudentAttendance`, () => {
    describe(`Render`, () => {
        test(`Student Attendance widget renders correctly`, () => {
            render((
                <StudentAttendance
                    widgetContext={defaultWidgetContext}
                />
            ));
        });
    });
});