import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import config from '~/config';
import BraceVertical from './images/brace-vertical.svg';
import { getOrientationNames } from '~/apps/Map/hbi-utils';

import HBISign from '../HBISign';
import Label from '~/components2/Label';
import { RootState, useTypedSelector } from '~/store';
import { selectors } from '../../MapState';
import { BOTH_SIDES, LEFT_SIDE, RIGHT_SIDE } from '../../constants';

const BikeLevelStatus = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
`;

const SidesWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StyledBraceVertical = styled(BraceVertical)`
  margin-left: auto;
  align-self: center;
`;

const Section = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionCenter = styled(Section)`
  align-items: center;
`;

const SectionLeft = styled(Section)`
  font-weight: 300;
  display: flex;
  flex-direction: row;
`;

const LevelLabel = styled.span`
  color: ${(props) => props.color || config.colors.darkbg};
`;

export const HBIStatus = ({ openDetail }) => {
  const section: any = useSelector<RootState>(
    (state) => state.MapState.popupData
  );
  if (section == null) return null;

  const hbi = useTypedSelector(selectors.getCurrentHBI);

  const orientationNames = getOrientationNames(
    section.side0_orientation,
    section.side1_orientation
  );

  return (
    <BikeLevelStatus>
      <SectionLeft>
        <SidesWrapper>
          {hbi[LEFT_SIDE].level && (
            <Label margin="0 0 10px 0">
              {orientationNames.side0}:
              <LevelLabel color={hbi[LEFT_SIDE].color}>
                {hbi[LEFT_SIDE].label}
              </LevelLabel>
            </Label>
          )}
          {hbi[RIGHT_SIDE].level && (
            <Label margin="0 0 10px 0">
              {orientationNames.side1}:
              <LevelLabel color={hbi[RIGHT_SIDE].color}>
                {hbi[RIGHT_SIDE].label}
              </LevelLabel>
            </Label>
          )}
        </SidesWrapper>
        {(hbi[LEFT_SIDE].level || hbi[RIGHT_SIDE].level) && (
          <StyledBraceVertical />
        )}
      </SectionLeft>

      <SectionCenter>
        <HBISign onClick={openDetail} color={hbi[BOTH_SIDES].color} />
      </SectionCenter>

      <Section>
        <Label>
          Happy-Bike-Index: <strong>{hbi[BOTH_SIDES].label}</strong>
        </Label>
      </Section>
    </BikeLevelStatus>
  );
};
