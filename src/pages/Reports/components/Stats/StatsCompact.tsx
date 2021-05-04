import debug from 'debug';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { loadStats } from '~/pages/Reports/apiservice';
import { Stats } from '~/pages/Reports/types';

import PinLarge from './assets/pin-large-neutral.svg';
import PinSmall from './assets/pin-small-neutral.svg';

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

const COUNTUP_ACCELERATION = 0.1;

const StatsCounter = () => {
  const [stats, setStats] = useState<Stats>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [countup, setCountup] = useState<number>(10);

  // Animated counter increases continuously until the actual numbers are loaded
  // and the animated counter has reached a value that is larger than the
  // actual number.
  useEffect(() => {
    let timeout: number;
    const increaseCountup = () => {
      setCountup(
        (oldCountup) => oldCountup + COUNTUP_ACCELERATION * oldCountup
      );
      if (isLoading || stats.plannings < countup || stats.reports < countup) {
        timeout = setTimeout(increaseCountup, 40);
      }
    };

    increaseCountup();

    return () => clearTimeout(timeout);
  }, []);

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
          <span>
            {isLoading || stats.reports > countup
              ? Math.floor(countup)
              : stats.reports}
          </span>
        </Count>
        Meldungen wurden von Bürger*innen abgegeben
      </Category>
      <Category>
        <Count>
          <StyledPinLarge />{' '}
          <span>
            {isLoading || stats.plannings > countup
              ? Math.floor(countup)
              : stats.plannings}
          </span>
        </Count>
        Planungen bisher, weitere folgen
      </Category>
    </Container>
  );
};

export default StatsCounter;
