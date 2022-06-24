import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AchievementWidget from './AchievementWidget';
import { Box } from '@mui/material';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/AchievementWidget',
  component: AchievementWidget,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof AchievementWidget>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AchievementWidget> = (args) => (
  <Box sx={{ height: 350 }}>
    <AchievementWidget {...args} />
  </Box>
);

export const Story = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Story.args = {
  widgetContext: {
    editing: false
  }
};
Story.storyName = "AchievementWidget"
