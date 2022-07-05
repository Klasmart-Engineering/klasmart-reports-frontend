import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ListItemComponent from './ListItem';

export default {
  title: 'Components/ListItem',
  component: ListItemComponent,
} as ComponentMeta<typeof ListItemComponent>;

const Template: ComponentStory<typeof ListItemComponent> = (args) => <ListItemComponent {...args} />;

export const Story = Template.bind({});
Story.args = {
  title: `Title`,
  subtitle: ``,
};
Story.storyName = "ListItem"
