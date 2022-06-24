import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AttendanceRate from './AttendanceRate';
import { Box } from '@mui/material';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/AttendanceRate',
  component: AttendanceRate,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof AttendanceRate>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AttendanceRate> = (args) => (
  <Box sx={{ height: 350 }}>
    <AttendanceRate {...args} />
  </Box>
);

export const Story = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Story.args = {
  widgetContext: {
    editing: false
  }
};
Story.storyName = "AttendanceRate"
