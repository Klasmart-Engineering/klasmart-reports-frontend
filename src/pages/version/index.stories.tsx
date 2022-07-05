import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import VersionPage from './index';

export default {
  title: 'Pages/version',
  component: VersionPage,
} as ComponentMeta<typeof VersionPage>;

const Template: ComponentStory<typeof VersionPage> = (args) => <VersionPage {...args} />;

export const Version = Template.bind({});
Version.args = {
};
Version.storyName = "version"
