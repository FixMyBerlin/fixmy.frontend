import debug from 'debug';
import React, { useEffect, useState } from 'react';

import { loadStats } from '~/pages/Reports/apiservice';
import { Stats } from '~/pages/Reports/types';

const logger = debug('fmc:Gastro:Stats');

const COUNTUP_ACCELERATION = 0.1;

const StatsLoader = ({ component: Component, ...props }) => {
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
    <Component
      isLoading={isLoading}
      countup={countup}
      stats={stats}
      {...props}
    />
  );
};

export default StatsLoader;
