import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AdaptiveLearningJourney from './AdaptiveLearningJourney';

export default {
  title: 'Components/AdaptiveLearningJourney',
  component: AdaptiveLearningJourney,
} as ComponentMeta<typeof AdaptiveLearningJourney>;

const Template: ComponentStory<typeof AdaptiveLearningJourney> = (args) => <AdaptiveLearningJourney {...args} />;

export const Story = Template.bind({});
Story.args = {
  editing: false,
  onRemove: () => {return;},
};
Story.storyName = "AdaptiveLearningJourney"
