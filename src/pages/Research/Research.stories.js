import React from 'react';

import { ArticleWrapper } from '~/components2/Article/';
import BarChartComponent from './components/BarChart';

export default {
  title: 'Research / BarChart',
  component: BarChartComponent.Wrapper,
  subcomponents: {
    BarChart: BarChartComponent,
  },
  decorators: [
    (storyFn) => (
      <ArticleWrapper>
        <section>{storyFn()}</section>
      </ArticleWrapper>
    ),
  ],
};

const Template = ({ title, source, barcharts }) => (
  <BarChartComponent.Wrapper title={title} source={source}>
    {barcharts.map((args) => (
      <BarChartComponent {...args} />
    ))}
  </BarChartComponent.Wrapper>
);

export const UserGroups = Template.bind({});

UserGroups.args = {
  title: 'RVA Führung Fahrbahn und Seitenraum',
  source: 'Anm: Durchschnitt der Bewertungen aller Situationen mit RVA.',
  barcharts: [
    {
      title: 'RVA auf Fahrbahn',
      data: [74.4550633, 21.22332867, 39.02780333, 32.303362],
      feelsafe: 71.331,
    },
    {
      title: 'RVA im Seitenraum',
      data: [34.3291067, 14.276962, 34.29517267, 47.99495467],
      feelsafe: 82.29,
    },
  ],
};

export const Weights = Template.bind({});

Weights.args = {
  ...UserGroups.args,
  barcharts: [
    {
      title: 'RVA auf Fahrbahn',
      data: [74.4550633],
    },
    {
      title: 'RVA im Seitenraum',
      data: [34.3291067],
    },
  ],
};
