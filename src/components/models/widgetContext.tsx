import { ReactElement } from "react";
import { WidgetType } from "./widget.model";

export type Widgets = { [P: string]: ReactElement }

export type Layout = {i: WidgetType; x: number; y: number; h: number; w: number}

export type Layouts = { [P: string]: Layout[] }

export enum WidgetView {
    TEACHER = `teacher`,
    STUDENT = `student`,
    DEFAULT = `default`
}

export type Context = {
    editing: boolean;
    checkIfLayoutUpdated: () => void;
    editWidgets: () => void;
    cancelEditing: () => void;
    widgets : Widgets;
    resetWidgets: () => void;
    saveWidgets: (widgets: Widgets, layouts: Layouts) => void;
    addWidget: (id: WidgetType, widgets: Widgets, layouts: Layouts) => void;
    removeWidget: (id: WidgetType, widgets: Widgets, layouts: Layouts) => void;
    reorderWidgets: (layout: Layout[]) => void;
    layouts: Layouts;
    view: WidgetView | null;
}

export const defaultContext = {} as Context;