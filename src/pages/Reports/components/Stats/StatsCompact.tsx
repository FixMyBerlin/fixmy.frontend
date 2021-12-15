import React from 'react';
import styled from 'styled-components';

import PinLarge from './assets/pin-large-neutral.svg';
import PinSmall from './assets/pin-small-neutral.svg';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Category = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-end;
  width: 50%;
  font-size: 12px;
`;

const Count = styled.div`
  height: 72px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 24px;
  font-weight: light;
  line-height: 1.5;
`;

const StyledPinSmall = styled(PinSmall)`
  width: 20px;
  height: 20px;
  margin-right: 0.5em;
`;

const StyledPinLarge = styled(PinLarge)`
  width: 66px;
  height: 72px;
  margin-right: 0.5em;
`;

const StatsCompact = ({ getDisplayValue }) => {
  return (
    <Container>
      <Category>
        <Count>
          <StyledPinSmall />
          <span>{getDisplayValue('reportsBikeStands')}</span>
        </Count>
        Fahrradbügelwünsche wurden von Bürger*innen gemeldet
      </Category>
      <Category>
        <Count>
          <StyledPinLarge />{' '}
          <span>{getDisplayValue('planningsBikeStands')}</span>
        </Count>
        Planungen und umgesetzte Radbügel bisher
      </Category>
    </Container>
  );
};

export default StatsCompact;
