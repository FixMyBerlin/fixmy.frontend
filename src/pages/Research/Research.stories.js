import React from 'react';

import { ArticleWrapper } from '~/components2/Article/';
import BarChartComponent from './components/BarChart';

export default {
  title: 'Research',
  decorators: [
    (storyFn) => (
      <ArticleWrapper>
        <section>{storyFn()}</section>
      </ArticleWrapper>
    )
  ]
};

export const BarChart = () => (
  <BarChartComponent.Wrapper
    title="RVA Führung Fahrbahn und Seitenraum"
    source="Anm: Durchschnitt der Bewertungen aller Situationen mit RVA."
  >
    <BarChartComponent
      title="RVA auf Fahrbahn"
      data={[74.4550633, 21.22332867, 39.02780333, 32.303362]}
      feelsafe={71.331}
    />
    <BarChartComponent
      title="RVA im Seitenraum"
      data={[34.3291067, 14.276962, 34.29517267, 47.99495467]}
      feelsafe={82.29}
    />
  </BarChartComponent.Wrapper>
);
