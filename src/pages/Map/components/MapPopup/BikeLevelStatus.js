import React from 'react';
import styled from 'styled-components';

import BraceVertical from '~/images/brace-vertical.svg';
import { numberFormat } from '~/utils/utils';
import { getHBIbyProps, getHBIColorByIndex } from '~/utils/hbi-utils';

import HBISign from '~/components/HBISign';
import Label from '~/components/Label';

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
  color: ${props => props.color || config.colors.darkbg};
`;

export default (props) => {
  let level0 = getHBIbyProps(props.section, 'side0');
  let level1 = getHBIbyProps(props.section, 'side1');
  const isLevel0Valid = !isNaN(level0);
  const isLevel1Valid = !isNaN(level1);
  level0 = isLevel0Valid ? level0 : 0;
  level1 = isLevel1Valid ? level1 : 0;

  const bikeLevelTotal = (level0 + level1) / 2;
  const level0Color = getHBIColorByIndex(level0);
  const level1Color = getHBIColorByIndex(level1);

  console.log(isLevel0Valid, isLevel1Valid);

  return (
    <BikeLevelStatus {...props}>
      <SectionLeft>
        <SidesWrapper>
          {isLevel0Valid && <Label margin="0 0 10px 0">Westseite: <LevelLabel color={level0Color}>{numberFormat(level0)}</LevelLabel></Label>}
          {isLevel1Valid && <Label>Ostseite: <LevelLabel color={level1Color}>{numberFormat(level1)}</LevelLabel></Label>}
        </SidesWrapper>
        <StyledBraceVertical />
      </SectionLeft>
      <SectionCenter>
        <HBISign isTooltip onClick={props.onClick} hbi={bikeLevelTotal} />
      </SectionCenter>
      <Section>
        <Label>Aktueller Happy-Bike-Index</Label>
      </Section>
    </BikeLevelStatus>
  );
};
