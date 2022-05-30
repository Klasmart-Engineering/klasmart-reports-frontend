import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TeacherLoad from './TeacherLoadWidget';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/TeacherLoad',
  component: TeacherLoad,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof TeacherLoad>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TeacherLoad> = (args) => <TeacherLoad {...args} />;

export const Story = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Story.args = {
  title: `Title`,
  subtitle: ``,
};
Story.storyName = "TeacherLoad"
