import LocaleProvider from "@/locale/Provider";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";

export interface ListItemProps {
    title: string;
    subtitle?: string;
    onClick?: React.MouseEventHandler<HTMLLIElement>;
}

export default function ListItem (props: ListItemProps) {
    useEffect(() => {
        console.log(`ListItem mounted`)
        return () => console.error(`ListItem destroyed`)
    }, []);
    return (
        <LocaleProvider>
            <li onClick={props.onClick}>
                <div>
                    <FormattedMessage id="child.label" />:&nbsp;
                    <span>{props.title}</span>
                </div>
                {props.subtitle && (
                    <div>{props.subtitle}</div>
                    )}
            </li>
        </LocaleProvider>
    );
}