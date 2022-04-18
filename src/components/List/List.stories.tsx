import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ListComponent from './List';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/List',
  component: ListComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    noItemsLabel: {
      table: {
        defaultValue: { summary: `No items` },
      },
    }
  }
} as ComponentMeta<typeof ListComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ListComponent> = (args) => <ListComponent {...args} />;

export const List = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
List.args = {
  header: `Header`,
  items: [],
  noItemsLabel: `There is nothing to see here`
};
List.storyName = "List"
