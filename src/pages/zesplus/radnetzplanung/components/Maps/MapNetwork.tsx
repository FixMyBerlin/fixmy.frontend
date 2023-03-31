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
import Icons0 from './icons/s0.svg';
import Icons1 from './icons/s1.svg';
import Icons2 from './icons/s2.svg';
import Icons3 from './icons/s3.svg';
import Icons4 from './icons/s4.svg';
import IconSchool from './icons/school.svg';
import IconToSchoolUnsafe from './icons/schulwege-unsicher.svg';
import IconToSchool from './icons/schulwege.svg';
import {
  ZES_INITAL_CENTER,
  ZES_INITIAL_ZOOM,
  ZES_MAX_BOUNDS,
} from '../../../mapboxOptions.const';
import { IconLegendLine } from './IconLegend';

export const MapNetwork = () => {
  return (
    <>
      <ArticleMap
        mapboxStyle="mapbox://styles/hejco/cleinrgsu005k01kgxybe81eh"
        maxBounds={ZES_MAX_BOUNDS}
        center={ZES_INITAL_CENTER}
        zoom={ZES_INITIAL_ZOOM}
      />
      <Legend>
        <LegendCol>
          <LegendHeader>Netzentwurfskarte</LegendHeader>
          <LegendItems>
            <LegendItem>
              <IconWrapper>
                <IconLegendLine color="#dd0303" width={4} />
              </IconWrapper>
              Netzentwurf
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconLegendLine color="hsla(313, 18%, 69%, 0.37)" width={4} />
              </IconWrapper>
              Wohnstraßen ohne Oberfläche=schlecht
            </LegendItem>
            <LegendItem>
              <IconWrapper>
                <IconLegendLine color="#ffd53d" width={4} />
              </IconWrapper>
              Netzvorschläge Bürger:innen
            </LegendItem>
          </LegendItems>
        </LegendCol>
        {/* <LegendSources>
          Quellen: -
        </LegendSources> */}
      </Legend>
    </>
  );
};
