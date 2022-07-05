import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ContentStatus from './ContentStatus';
import { Box } from '@mui/material';

export default {
  title: 'Components/ContentStatus',
  component: ContentStatus,
} as ComponentMeta<typeof ContentStatus>;

const Template: ComponentStory<typeof ContentStatus> = (args) => (
  <Box sx={{ height: 350 }}>
    <ContentStatus {...args} />
  </Box>
);

export const Story = Template.bind({});
Story.args = {
  widgetContext: {
    editing: false
  }
};
Story.storyName = "ContentStatus"
