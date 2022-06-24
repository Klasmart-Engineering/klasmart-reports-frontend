import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PendingAssessments from './PendingAssessments';
import { Box } from '@mui/material';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/PendingAssessments',
  component: PendingAssessments,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof PendingAssessments>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PendingAssessments> = (args) => (
  <Box sx={{ height: 350 }}>
    <PendingAssessments {...args} />
  </Box>
);

export const Story = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Story.args = {
  widgetContext: {
    editing: false
  }
};
Story.storyName = "PendingAssessments"
