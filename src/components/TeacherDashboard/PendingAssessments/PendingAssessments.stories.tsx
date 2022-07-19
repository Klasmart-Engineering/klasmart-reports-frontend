import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PendingAssessments from './PendingAssessments';
import { Box } from '@mui/material';

export default {
  title: 'Components/PendingAssessments',
  component: PendingAssessments,
} as ComponentMeta<typeof PendingAssessments>;

const Template: ComponentStory<typeof PendingAssessments> = (args) => (
  <Box sx={{ height: 350 }}>
    <PendingAssessments {...args} />
  </Box>
);

export const Story = Template.bind({});
Story.args = {
  editing: false,
  onRemove: () => {return;},
};
Story.storyName = "PendingAssessments"
