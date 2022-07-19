import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AchievementWidget from './AchievementWidget';
import { Box } from '@mui/material';

export default {
  title: 'Components/AchievementWidget',
  component: AchievementWidget,
} as ComponentMeta<typeof AchievementWidget>;

const Template: ComponentStory<typeof AchievementWidget> = (args) => (
  <Box sx={{ height: 350 }}>
    <AchievementWidget {...args} />
  </Box>
);

export const Story = Template.bind({});
Story.args = {
  editing: false,
  onRemove: () => {return;},
};
Story.storyName = "AchievementWidget"
