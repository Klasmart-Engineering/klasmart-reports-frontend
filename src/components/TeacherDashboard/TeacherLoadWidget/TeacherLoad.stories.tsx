import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TeacherLoad from './TeacherLoadWidget';
import { Box } from '@mui/material';

export default {
  title: 'Components/TeacherLoad',
  component: TeacherLoad,
} as ComponentMeta<typeof TeacherLoad>;

const Template: ComponentStory<typeof TeacherLoad> = (args) => (
  <Box sx={{ height: 350 }}>
    <TeacherLoad {...args} />
  </Box>
);

export const Story = Template.bind({});
Story.args = {
  editing: false,
  onRemove: () => {return;},
};
Story.storyName = "TeacherLoad"
