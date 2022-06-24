import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LearningOutcomeWidget from './LearningOutcomeSummary';
import { Box } from '@mui/material';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/LearningOutcomeWidget',
  component: LearningOutcomeWidget,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof LearningOutcomeWidget>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LearningOutcomeWidget> = (args) => (
  <Box sx={{ height: 350 }}>
    <LearningOutcomeWidget {...args} />
  </Box>
);

export const Story = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Story.args = {
  widgetContext: {
    editing: false
  }
};
Story.storyName = "LearningOutcomeWidget"
