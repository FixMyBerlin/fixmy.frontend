import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import config from '~/config';
import BraceVertical from '~/images/brace-vertical.svg';
import { numberFormat } from '~/utils/utils';
import {
  getHBIbyProps,
  getHBIColorByIndex,
  getOrientationNames,
} from '~/apps/Map/hbi-utils';

import HBISign from '../HBISign';
import Label from '~/components2/Label';
import { RootState } from '~/store';
import { setDetailsMapView } from '../../MapState';

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

export const HBIStatus = () => {
  const section: any = useSelector<RootState>(
    (state) => state.MapState.popupData
  );
  const dispatch = useDispatch();

  if (section == null) return null;

  let level0 = getHBIbyProps(section, 'side0');
  let level1 = getHBIbyProps(section, 'side1');
  const isLevel0Valid = !Number.isNaN(level0);
  const isLevel1Valid = !Number.isNaN(level1);
  level0 = isLevel0Valid ? level0 : 0;
  level1 = isLevel1Valid ? level1 : 0;

  const bikeLevelTotal = (level0 + level1) / 2;
  const level0Color = getHBIColorByIndex(level0);
  const level1Color = getHBIColorByIndex(level1);

  const orientationNames = getOrientationNames(
    section.side0_orientation,
    section.side1_orientation
  );

  return (
    <BikeLevelStatus>
      <SectionLeft>
        <SidesWrapper>
          {isLevel0Valid && (
            <Label margin="0 0 10px 0">
              {orientationNames.side0}:
              <LevelLabel color={level0Color}>
                {numberFormat(level0)}
              </LevelLabel>
            </Label>
          )}
          {isLevel1Valid && (
            <Label>
              {orientationNames.side1}:
              <LevelLabel color={level1Color}>
                {numberFormat(level1)}
              </LevelLabel>
            </Label>
          )}
        </SidesWrapper>
        <StyledBraceVertical />
      </SectionLeft>
      <SectionCenter>
        <HBISign
          isTooltip
          onClick={() => dispatch<any>(setDetailsMapView())}
          hbi={bikeLevelTotal}
        />
      </SectionCenter>
      <Section>
        <Label>Aktueller Happy-Bike-Index</Label>
      </Section>
    </BikeLevelStatus>
  );
};
