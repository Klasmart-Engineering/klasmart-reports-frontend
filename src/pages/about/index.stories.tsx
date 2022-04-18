import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AboutPage from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
/**
 * Nice we gucci
 */
export default {
  title: 'Pages/about',
  component: AboutPage,
  parameters: {
    componentSubtitle: 'Displays an image that represents a user or organization',
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes,
} as ComponentMeta<typeof AboutPage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AboutPage> = (args) => <AboutPage {...args} />;

export const About = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
About.args = {
};
About.storyName = "about"
