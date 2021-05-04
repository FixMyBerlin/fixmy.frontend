import debug from 'debug';
import React, { useEffect, useState } from 'react';
import { InView } from 'react-intersection-observer';

import { loadStats } from '~/pages/Reports/apiservice';
import { Stats } from '~/pages/Reports/types';

const logger = debug('fmc:Gastro:Stats');

const COUNTUP_ACCELERATION = 0.1;

const StatsLoader = ({ component: Component, animate = false, ...props }) => {
  const [countup, setCountup] = useState<number>(10);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isVisible, setVisible] = useState<boolean>(false);
  const [stats, setStats] = useState<Stats>(null);

  const handleVisibilityChange = (inView: boolean) => {
    if (inView) setVisible(true);
  };

  // Animated counter increases continuously until the actual numbers are loaded
  // and the animated counter has reached a value that is larger than the
  // actual number.
  useEffect(() => {
    if (!isVisible || !animate) {
      // Return an empty clean-up function because no timeout has been created yet
      return () => {};
    }

    let timeout: number;
    const increaseCountup = () => {
      setCountup(
        (oldCountup) => oldCountup + COUNTUP_ACCELERATION * oldCountup
      );

      // Continue counting up until loading is finished and the countup
      // is higher than the loaded values for plannings and reports
      if (isLoading || countup < stats.plannings || countup < stats.reports) {
        timeout = setTimeout(increaseCountup, 40);
      }
    };

    increaseCountup();

    return () => clearTimeout(timeout);
  }, [isVisible]);

  /**
   * Returns the requests value from stats, which is animated if the `animate`
   * prop is set on this component
   *
   * @param key any key from stats except `planningsByStatus`
   * @returns number
   */
  const getDisplayValue = (
    key: 'plannings' | 'reports' | 'planningsBikeStands' | 'reportsBikeStands'
  ) => {
    if (isLoading) {
      if (animate) {
        return Math.floor(countup);
      }
      return 0;
    }

    if (animate) {
      return countup < stats[key] ? Math.floor(countup) : stats[key];
    }
    return stats[key];
  };

  // Request counter stats from API
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
    <InView as="div" onChange={handleVisibilityChange}>
      <Component
        isLoading={isLoading}
        getDisplayValue={getDisplayValue}
        stats={stats}
        {...props}
      />
    </InView>
  );
};

export default StatsLoader;
