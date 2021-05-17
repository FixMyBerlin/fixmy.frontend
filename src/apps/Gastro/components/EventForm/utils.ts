import { addDays, isWeekend } from 'date-fns';
import debug from 'debug';

const log = debug('fmc:gastro:EventForm');

/**
 * Return the earliest possible date for a new event, which is 20 working days
 * from today.
 */
export const getMinDate = (): Date => {
  let day = new Date();
  let c = 0;
  while (c < 20) {
    day = addDays(day, 1);
    if (!isWeekend(day)) {
      c += 1;
    }
  }
  log(day);
  return day;
};
