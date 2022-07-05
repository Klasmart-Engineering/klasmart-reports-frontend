import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ListComponent from './List';

export default {
  title: 'Components/List',
  component: ListComponent,
  argTypes: {
    noItemsLabel: {
      table: {
        defaultValue: { summary: `No items` },
      },
    }
  }
} as ComponentMeta<typeof ListComponent>;

const Template: ComponentStory<typeof ListComponent> = (args) => <ListComponent {...args} />;

export const List = Template.bind({});
List.args = {
  header: `Header`,
  items: [],
  noItemsLabel: `There is nothing to see here`
};
List.storyName = "List"
