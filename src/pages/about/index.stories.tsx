import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AboutPage from './index';

export default {
  title: 'Pages/about',
  component: AboutPage,
  parameters: {
    componentSubtitle: 'Displays an image that represents a user or organization',
  },
} as ComponentMeta<typeof AboutPage>;

const Template: ComponentStory<typeof AboutPage> = (args) => <AboutPage {...args} />;

export const About = Template.bind({});
About.args = {
};
About.storyName = "about"
