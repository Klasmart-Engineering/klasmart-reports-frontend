import React, { useEffect } from "react";
import ListItem, { ListItemProps } from "@/components/ListItem";
import { FormattedMessage } from "react-intl";
import LocaleProvider from "@/locale/Provider";

export interface ListProps {
    header: string;
    items: ListItemProps[];
    noItemsLabel?: string;
}

export default function List (props: ListProps) {
    useEffect(() => {
        // @ts-ignore
        console.log(`List mounted`, kex)
        return () => console.error(`List destroyed`)
    }, []);

    return (
        <LocaleProvider>
            <div>
                <FormattedMessage id="parent.label" />:&nbsp;
                <span>{props.header}</span>
            </div>
            <ul>
                {!props.items.length && (
                    <ListItem title={props.noItemsLabel || `No items`} />
                )}
                {props.items.map((item) => (
                    <ListItem
                        key={item.title}
                        {...item}
                    />
                ))}
            </ul>
        </LocaleProvider>
    );
}