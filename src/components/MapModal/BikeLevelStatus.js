import React from 'react';
import styled from 'styled-components';

import BikeIcon from '~/images/bike.svg';
import { numberFormat, getHBIbyProps } from '~/utils';

const BikeLevelStatus = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  font-weight: 600;
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

const HBISign = styled.div`
  border: 3px solid ${config.colors.index};
  width: 62px;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  text-align: center;
  box-shadow: 0 0 2px 2px rgba(0,0,0,.18);
  text-decoration: none;
  color:  ${config.colors.darkgrey};
  cursor: pointer;

  svg {
    path {
      fill: ${config.colors.index};
    }
  }
`;

const LevelLabel = styled.span`
  color: ${config.colors.index};
`;

export default (props) => {
  const level0 = getHBIbyProps(props.section, 'side0');
  const level1 = getHBIbyProps(props.section, 'side1');

  const bikeLevelTotal = (level0 + level1) / 2;
  const bikeLevelTotalFormatted = numberFormat(bikeLevelTotal);

  return (
    <BikeLevelStatus {...props}>
      <SectionLeft>
        <div>Westseite: <LevelLabel>{numberFormat(level0)}</LevelLabel></div>
        <div>Ostseite: <LevelLabel>{numberFormat(level1)}</LevelLabel></div>
      </SectionLeft>
      <SectionCenter>
        <HBISign onClick={props.onClick}>
          <div>
            <BikeIcon />
            <div>{bikeLevelTotalFormatted}</div>
          </div>
        </HBISign>
      </SectionCenter>
      <Section>
        <div>Aktueller Happy-Bike-Index</div>
      </Section>
    </BikeLevelStatus>
  );
};
