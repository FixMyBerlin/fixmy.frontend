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
  const level0 = getHBIbyProps(props.section, 'side0');
  const level1 = getHBIbyProps(props.section, 'side1');
  const bikeLevelTotal = (level0 + level1) / 2;
  const level0Color = getHBIColorByIndex(level0);
  const level1Color = getHBIColorByIndex(level1);

  return (
    <BikeLevelStatus {...props}>
      <SectionLeft>
        <SidesWrapper>
          <Label margin="0 0 10px 0">Westseite: <LevelLabel color={level0Color}>{numberFormat(level0)}</LevelLabel></Label>
          <Label>Ostseite: <LevelLabel color={level1Color}>{numberFormat(level1)}</LevelLabel></Label>
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
