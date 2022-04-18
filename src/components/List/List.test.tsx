import render from "tests/utils/render";
import { screen } from "@testing-library/react";
import List, { ListProps } from "./List";
import React, {useEffect} from "react";
import { ListItemProps } from "../ListItem";
import { useRecoilValue, RecoilState } from "recoil";

export const RecoilObserver = ({node, onChange} : {node: RecoilState<any>, onChange: any }) => {
    const value = useRecoilValue(node);
    useEffect(() => onChange(value), [onChange, value]);
    return null;
  };

describe(`List`, () => {
    const defaultProps: ListProps = {
        header: `Title`,
        items: [],
    }
    describe(`Render`, () => {
        test(`default props`, () => {
            render(<List {...defaultProps} />);

            const headerEl = screen.getByText(defaultProps.header);
            const noItemsLabelEl = screen.getByText(`No items`);
            
            expect(headerEl).toHaveTextContent(defaultProps.header);
            expect(noItemsLabelEl).toHaveTextContent(`No items`);
        })
        
        test.each([ 1, 2 ])(`items (count) = %s`, (itemCount) => {
            const items: ListItemProps[] = [...Array(itemCount).keys()].map((value) => ({
                title: `Index: ${value}`,
            }));
            const onChange = jest.fn();
            render((
                <List
                    {...defaultProps}
                    items={items}
                />
            ));

            const listItemEls = screen.getAllByRole(`listitem`);
            
            expect(listItemEls).toHaveLength(items.length);
        });

        test(`noItemsLabel`, () => {
            const mockedNoItemsLabel = `Empty`;
            render((
                <List
                    {...defaultProps}
                    noItemsLabel={mockedNoItemsLabel}
                />
            ));

            const noItemsEl = screen.getByText(mockedNoItemsLabel);
            
            expect(noItemsEl).toHaveTextContent(mockedNoItemsLabel);
        })
    });
});
