import React from 'react';
import styled from 'styled-components';

import {
  Heading,
  SectionProps,
  Map as ArticleMap,
} from '~/components2/Article';
import { media } from '~/styles/utils';
import config from '~/config';

const MAP_STYLE_SAFETY = 'mapbox://styles/hejco/ckguzkrtq06em19l9477wwzc2';
// const MAP_STYLE_QUALITY = 'mapbox://styles/hejco/ckhurerfv3wgv1aog7t7ek3gs';
// const MAP_STYLE_TARGET = 'mapbox://styles/hejco/ckhufbloj0gmz19pk0m6bd4d2';

const Legend = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 20px;
  margin: 1em -16px;
  padding: 0.5em 1em;
  background-color: ${config.colors.inactivegrey};
  justify-content: space-between;

  ${media.m`
    margin: 0 auto;
    padding: 1em;
  `}
`;

const LegendCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.75em;
`;

const LegendItems = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const LegendHeader = styled.h4`
  margin: 1rem 0;
`;

const LegendItem = styled.div`
  align-items: center;
  color: ${config.colors.darkgrey};
  display: flex;
  flex-direction: row;
  line-height: 1.16;
  & + & {
    margin-top: 10px;
  }
  & img {
    margin-right: 10px;
  }
`;

const LegendSources = styled.div`
  color: ${config.colors.midgrey};
  margin: 1rem 0;
`;

const SectionSafety = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Auswertung der Sicherheit
    </Heading>
    <ArticleMap mapboxStyle={MAP_STYLE_SAFETY} />
    <Legend>
      <LegendCol>
        <LegendHeader>Schulwegsicherheit</LegendHeader>
        <LegendItems>
          <LegendItem>Schulwege</LegendItem>
          <LegendItem>Unsichere Abschnitte auf Schulwegen</LegendItem>
          <LegendItem>Bildungseinrichtungen</LegendItem>
        </LegendItems>
        <LegendSources>Quellen: NUDAFA, OSM</LegendSources>
      </LegendCol>
      <LegendCol>
        <LegendHeader>Unfallkategorien</LegendHeader>
        <LegendItems>
          <LegendItem>mit Getöteten</LegendItem>
          <LegendItem>mit Schwerverletzten</LegendItem>
          <LegendItem>mit Leichtverletzten</LegendItem>
          <LegendItem>mit Sachschaden</LegendItem>
        </LegendItems>
        <LegendSources>Quelle: Polizeipräsidium Brandenburg</LegendSources>
      </LegendCol>
      <LegendCol>
        <LegendHeader>Gefahrenstellen</LegendHeader>
        <LegendItems>
          <LegendItem>Beinäheunfälle</LegendItem>
        </LegendItems>
        <LegendSources>Quellen: SimRa</LegendSources>
      </LegendCol>
    </Legend>
  </>
);

export default SectionSafety;
