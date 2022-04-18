import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import VersionPage from './index';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Pages/version',
  component: VersionPage,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof VersionPage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof VersionPage> = (args) => <VersionPage {...args} />;

export const Version = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Version.args = {
};
Version.storyName = "version"
