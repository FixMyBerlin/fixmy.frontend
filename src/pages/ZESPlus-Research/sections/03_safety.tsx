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

import { Heading, SectionProps } from '~/components2/Article';

const SectionSafety = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Auswertung der Sicherheit
    </Heading>
    <ArticleMap mapboxStyle={MAP_STYLE_SAFETY} />
  </>
);

export default SectionSafety;
