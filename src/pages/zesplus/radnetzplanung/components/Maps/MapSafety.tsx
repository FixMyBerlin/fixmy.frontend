import React from 'react';
import { Map as ArticleMap } from '~/components2/Article';
import {
  IconWrapper,
  Legend,
  LegendCol,
  LegendHeader,
  LegendItem,
  LegendItems,
  LegendSources,
} from '~/components2/Article/Map/MapLegendStyledComponents';
import Icons0 from '../../../forschungsprojekt/Maps/icons/s0.svg';
import Icons1 from '../../../forschungsprojekt/Maps/icons/s1.svg';
import Icons2 from '../../../forschungsprojekt/Maps/icons/s2.svg';
import Icons3 from '../../../forschungsprojekt/Maps/icons/s3.svg';
import Icons4 from '../../../forschungsprojekt/Maps/icons/s4.svg';
import IconSchool from '../../../forschungsprojekt/Maps/icons/school.svg';
import IconToSchoolUnsafe from '../../../forschungsprojekt/Maps/icons/schulwege-unsicher.svg';
import IconToSchool from '../../../forschungsprojekt/Maps/icons/schulwege.svg';
import {
  ZES_INITAL_CENTER,
  ZES_INITIAL_ZOOM,
  ZES_MAX_BOUNDS,
} from '../../../mapboxOptions.const';

export const MapSafety = () => {
  return (
    <>
      <ArticleMap
        mapboxStyle="mapbox://styles/hejco/ckr4naaxp0mav17mpvpd9x4hf"
        maxBounds={ZES_MAX_BOUNDS}
        center={ZES_INITAL_CENTER}
        zoom={ZES_INITIAL_ZOOM}
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
          <LegendHeader>
            Unfälle mit Radfahrbeteiligung (2016-2021)⁴
          </LegendHeader>
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
          Quellen: ¹ ² Gemeinde Eichwalde 2020, ³ OpenStreetMap 2020, ⁴
          Polizeipräsidium Brandenburg 2021, ⁵ SimRa - TU Berlin 2020
        </LegendSources>
      </Legend>
    </>
  );
};
