import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StudentAttendance from './StudentAttendance';
import { Box } from '@mui/material';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/StudentAttendance',
  component: StudentAttendance,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof StudentAttendance>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof StudentAttendance> = (args) => (
  <Box sx={{ height: 350 }}>
    <StudentAttendance {...args} />
  </Box>
);

export const Story = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Story.args = {
  widgetContext: {
    editing: false
  }
};
Story.storyName = "StudentAttendance"
