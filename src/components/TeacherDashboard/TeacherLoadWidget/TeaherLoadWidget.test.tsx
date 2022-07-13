import render from "../../../../tests/utils/render";
import TeacherLoadWidget from "./TeacherLoadWidget";
import { defaultContext as defaultWidgetContext } from "../../models/widgetContext";
import React from "react";

describe(`TeacherLoadWidget`, () => {
    describe(`Render`, () => {
        test(`Teacher Load widget renders correctly`, () => {
            render((
                <TeacherLoadWidget
                    widgetContext={defaultWidgetContext}
                />
            ));
        });
    });
});
