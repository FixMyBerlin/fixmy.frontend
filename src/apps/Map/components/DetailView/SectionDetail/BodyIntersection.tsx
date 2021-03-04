import React from 'react';
import styled from 'styled-components';

import { selectors } from '~/apps/Map/MapState';
import { BOTH_SIDES, VZI_STOPS } from '~/apps/Map/constants';
import Label from '~/components2/Label';
import config from '~/config';
import { useTypedSelector } from '~/store';

import HBISign from '../../HBISign';
import ImageSlider from '../ImageSlider';
import { AccidentsFAQ } from './FAQs';
import { VisionZeroSection } from './VisionZeroSection';
import BraceSprite from './images/brace-horizontal.svg';
import CircleSprite from './images/circle.svg';

const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Brace = styled(BraceSprite)`
  width: 100%;
  margin: 0.5em 0;
`;

const Circle = styled(CircleSprite)`
  circle {
    fill: ${({ level }) => VZI_STOPS[level].color};
  }
`;

const HBIDetails = styled.section`
  background-color: ${config.colors.lightbg};
  padding-bottom: 0.5em;
`;

const HBISignWrapper = styled.div`
  position: relative;
  margin: -30px 0 0 0;
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;

  > div {
    cursor: default;
  }
`;

const VisionZeroCheck = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IndexLabel = styled(Label)`
  font-size: 12px;
  line-height: 1.3;
  text-align: center;
  margin: 0.8em;
`;

export const BodyIntersection = ({ sideIndex = BOTH_SIDES }) => {
  const data = useTypedSelector(({ MapState }) => MapState.hbiData);
  const hbiAllSides = useTypedSelector(selectors.getDetailsHBI);
  const hbi = hbiAllSides[sideIndex];

  // The dataset for intersection SectionDetails contains the wrong value for
  // `side`. Intersection data should be assigned to BOTH_SIDES but it is in
  // RIGHT_SIDE. Uncomment the following line when the dataset is correct.
  //
  // const details = data.details.find((d) => d.side === sideIndex);
  const details = data.details[0];

  // Get vision zero index from accident data set
  const accidentData = data.accidents.find((d) => d.side === sideIndex);
  const vzi = VZI_STOPS[accidentData.risk_level];

  return (
    <>
      <ImageSlider images={details && details.photos} />

      <HBIDetails>
        <HBISignWrapper>
          <HBISign color={hbi.color} level={hbi.value} />
          <IndexLabel margin="10px 0 3px 0">
            Happy-Bike-Index: <br />
            <strong>{hbi.label}</strong>
          </IndexLabel>
        </HBISignWrapper>

        <Brace />

        <ComponentWrapper>
          <VisionZeroCheck>
            <Circle level={vzi.value} />
            <IndexLabel>
              Vision-Zero-Check:
              <br />
              <strong>{vzi.label}</strong>
            </IndexLabel>
          </VisionZeroCheck>
        </ComponentWrapper>
      </HBIDetails>

      <VisionZeroSection accidents={accidentData} />

      <AccidentsFAQ />
    </>
  );
};
