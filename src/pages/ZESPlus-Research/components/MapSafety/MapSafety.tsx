import React from 'react';

import { Map as ArticleMap } from '~/components2/Article';
import { BOUNDS_ZES, ZES_CENTER, ZES_ZOOM } from '../../constants';
import {
  IconWrapper,
  Legend,
  LegendCol,
  LegendHeader,
  LegendItem,
  LegendItems,
  LegendSources,
} from '../BaseLegend';

import IconToSchool from './icons/schulwege.svg';
import IconToSchoolUnsafe from './icons/schulwege-unsicher.svg';
import IconSchool from './icons/school.svg';
import Icons0 from './icons/s0.svg';
import Icons1 from './icons/s1.svg';
import Icons2 from './icons/s2.svg';
import Icons3 from './icons/s3.svg';
import Icons4 from './icons/s4.svg';

const MAP_STYLE_SAFETY = 'mapbox://styles/hejco/ckguzkrtq06em19l9477wwzc2';

const MapSafety = () => (
  <>
    <ArticleMap
      mapboxStyle={MAP_STYLE_SAFETY}
      maxBounds={BOUNDS_ZES}
      center={ZES_CENTER}
      zoom={ZES_ZOOM}
    />
    <Legend>
      <LegendCol>
        <LegendHeader>Schulwegsicherheit</LegendHeader>
        <LegendItems>
          <LegendItem>
            <IconWrapper>
              <IconToSchool />
            </IconWrapper>
            <span>Schulwege¹ </span>
          </LegendItem>
          <LegendItem>
            <IconWrapper>
              <IconToSchoolUnsafe />
            </IconWrapper>
            Unsichere Abschnitte auf Schulwegen²
          </LegendItem>
          <LegendItem>
            <IconWrapper>
              <IconSchool />
            </IconWrapper>
            Bildungseinrichtungen³
          </LegendItem>
        </LegendItems>
      </LegendCol>
      <LegendCol>
        <LegendHeader>Unfälle mit Radfahrbeteiligung (2016-2020)⁴</LegendHeader>
        <LegendItems>
          <LegendItem>
            <IconWrapper>
              <Icons0 />
            </IconWrapper>{' '}
            mit Getöteten
          </LegendItem>
          <LegendItem>
            <IconWrapper>
              <Icons1 />
            </IconWrapper>{' '}
            mit Schwerverletzten
          </LegendItem>
          <LegendItem>
            <IconWrapper>
              <Icons2 />
            </IconWrapper>{' '}
            mit Leichtverletzten
          </LegendItem>
          <LegendItem>
            <IconWrapper>
              <Icons3 />
            </IconWrapper>{' '}
            mit Sachschaden
          </LegendItem>
        </LegendItems>
      </LegendCol>
      <LegendCol>
        <LegendHeader>Gefahrenstellen</LegendHeader>
        <LegendItems>
          <LegendItem>
            <IconWrapper>
              <Icons4 />
            </IconWrapper>{' '}
            Beinaheunfälle⁵
          </LegendItem>
        </LegendItems>
      </LegendCol>
      <LegendSources>
        Quellen: ¹ ² Gemeinde Eichwalde 2020, ³ OSM 2020, ⁴ Polizeipräsidium
        Brandenburg 2020, ⁵ SimRa - TU Berlin 2020
      </LegendSources>
    </Legend>
  </>
);

export default MapSafety;
