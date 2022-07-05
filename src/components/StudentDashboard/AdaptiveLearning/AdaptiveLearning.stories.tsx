import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AdaptiveLearningWidget from './AdaptiveLearningWidget';
import { Box } from '@mui/material';

export default {
  title: 'Components/AdaptiveLearningWidget',
  component: AdaptiveLearningWidget,
} as ComponentMeta<typeof AdaptiveLearningWidget>;

const Template: ComponentStory<typeof AdaptiveLearningWidget> = (args) => (
  <Box sx={{ height: 350 }}>
    <AdaptiveLearningWidget {...args} />
  </Box>
);

export const Story = Template.bind({});
Story.args = {
  widgetContext: {
    editing: false
  }
};
Story.storyName = "AdaptiveLearningWidget"
