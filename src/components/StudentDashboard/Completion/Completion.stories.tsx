import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CompletionWidget from './CompletionWidget';
import { Box } from '@mui/material';

export default {
  title: 'Components/CompletionWidget',
  component: CompletionWidget,
} as ComponentMeta<typeof CompletionWidget>;

const Template: ComponentStory<typeof CompletionWidget> = (args) => (
  <Box sx={{ height: 350 }}>
    <CompletionWidget {...args} />
  </Box>
);

export const Story = Template.bind({});
Story.args = {
  widgetContext: {
    editing: false
  }
};
Story.storyName = "CompletionWidget"
