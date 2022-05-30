import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ContentStatus from './ContentStatus';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/ContentStatus',
  component: ContentStatus,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof ContentStatus>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ContentStatus> = (args) => <ContentStatus {...args} />;

export const Story = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Story.args = {
  title: `Title`,
  subtitle: ``,
};
Story.storyName = "ContentStatus"
