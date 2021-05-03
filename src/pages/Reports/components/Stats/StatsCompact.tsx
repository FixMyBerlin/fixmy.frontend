import debug from 'debug';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { loadStats } from '~/pages/Reports/apiservice';
import ReportPin from '~/pages/Reports/components/ReportPin';
import config from '~/pages/Reports/config';
import { ENTRY_STATUS, Stats } from '~/pages/Reports/types';

import PinSmall from './assets/pin-small-neutral.svg';
import PinLarge from './assets/pin-large-neutral.svg';

const logger = debug('fmc:Gastro:Stats');

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

const StatsCounter = () => {
  const [stats, setStats] = useState<Stats>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const asyncEffect = async () => {
      try {
        setStats(await loadStats());
      } catch (err) {
        logger(err);
        setStats(null);
      }
      setLoading(false);
    };
    asyncEffect();
  }, []);

  return (
    <Container>
      <Category>
        <Count>
          <StyledPinSmall />
          <span>{isLoading ? '...' : stats.reports}</span>
        </Count>
        Meldungen wurden von Bürger*innen abgegeben
      </Category>
      <Category>
        <Count>
          <StyledPinLarge /> <span>{isLoading ? '...' : stats.plannings}</span>
        </Count>
        Planungen bisher, weitere folgen
      </Category>
    </Container>
  );
};

export default StatsCounter;
