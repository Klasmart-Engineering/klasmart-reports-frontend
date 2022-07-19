import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StudentAttendance from './StudentAttendance';
import { Box } from '@mui/material';

export default {
  title: 'Components/StudentAttendance',
  component: StudentAttendance,
} as ComponentMeta<typeof StudentAttendance>;

const Template: ComponentStory<typeof StudentAttendance> = (args) => (
  <Box sx={{ height: 350 }}>
    <StudentAttendance {...args} />
  </Box>
);

export const Story = Template.bind({});
Story.args = {
  editing: false,
  onRemove: () => {return;},
};
Story.storyName = "StudentAttendance"
