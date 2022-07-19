import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AttendanceRate from './AttendanceRate';
import { Box } from '@mui/material';

export default {
  title: 'Components/AttendanceRate',
  component: AttendanceRate,
} as ComponentMeta<typeof AttendanceRate>;

const Template: ComponentStory<typeof AttendanceRate> = (args) => (
  <Box sx={{ height: 350 }}>
    <AttendanceRate {...args} />
  </Box>
);

export const Story = Template.bind({});
Story.args = {
  editing: false,
  onRemove: () => {return;},
};
Story.storyName = "AttendanceRate"
