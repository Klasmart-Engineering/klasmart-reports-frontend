import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AdaptiveLearningJourney from './AdaptiveLearningJourney';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/AdaptiveLearningJourney',
  component: AdaptiveLearningJourney,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof AdaptiveLearningJourney>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AdaptiveLearningJourney> = (args) => <AdaptiveLearningJourney {...args} />;

export const Story = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Story.args = {
  widgetContext: {
    editing: false
  }
};
Story.storyName = "AdaptiveLearningJourney"
