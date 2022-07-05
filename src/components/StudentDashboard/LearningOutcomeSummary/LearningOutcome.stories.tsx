import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LearningOutcomeWidget from './LearningOutcomeSummary';
import { Box } from '@mui/material';

export default {
  title: 'Components/LearningOutcomeWidget',
  component: LearningOutcomeWidget,
} as ComponentMeta<typeof LearningOutcomeWidget>;

const Template: ComponentStory<typeof LearningOutcomeWidget> = (args) => (
  <Box sx={{ height: 350 }}>
    <LearningOutcomeWidget {...args} />
  </Box>
);

export const Story = Template.bind({});
Story.args = {
  widgetContext: {
    editing: false
  }
};
Story.storyName = "LearningOutcomeWidget"
