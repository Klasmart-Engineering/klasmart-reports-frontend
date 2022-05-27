import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AchievementWidget from './AchievementWidget';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/AchievementWidget',
  component: AchievementWidget,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof AchievementWidget>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AchievementWidget> = (args) => <AchievementWidget {...args} />;

export const Story = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Story.args = {
  title: `Title`,
  subtitle: ``,
};
Story.storyName = "AchievementWidget"
