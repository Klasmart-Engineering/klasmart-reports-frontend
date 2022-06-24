import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CompletionWidget from './CompletionWidget';
import { Box } from '@mui/material';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/CompletionWidget',
  component: CompletionWidget,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof CompletionWidget>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CompletionWidget> = (args) => (
  <Box sx={{ height: 350 }}>
    <CompletionWidget {...args} />
  </Box>
);

export const Story = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Story.args = {
  widgetContext: {
    editing: false
  }
};
Story.storyName = "CompletionWidget"
