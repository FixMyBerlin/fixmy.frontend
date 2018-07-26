import React from 'react';
import styled from 'styled-components';

import HBISign from '~/components/HBISign';
import { numberFormat, getHBIbyProps, getHBIColorByIndex } from '~/utils';

const BikeLevelStatus = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  line-height: 1.4;
  color: ${config.colors.darkgrey};
`;

const Section = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionCenter = Section.extend`
  align-items: center;
`;

const SectionLeft = Section.extend`
  font-weight: 300;
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
        <div>Westseite: <LevelLabel color={level0Color}>{numberFormat(level0)}</LevelLabel></div>
        <div>Ostseite: <LevelLabel color={level1Color}>{numberFormat(level1)}</LevelLabel></div>
      </SectionLeft>
      <SectionCenter>
        <HBISign isTooltip onClick={props.onClick} hbi={bikeLevelTotal} />
      </SectionCenter>
      <Section>
        <div>Aktueller Happy-Bike-Index</div>
      </Section>
    </BikeLevelStatus>
  );
};
