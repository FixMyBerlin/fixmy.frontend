import { addDays, isSunday } from 'date-fns';
import debug from 'debug';
import { isHoliday } from 'feiertagejs';

const log = debug('fmc:gastro:EventForm');

// Region is Berlin.
const HOLIDAY_REGION = 'BE';

/**
 * Return the earliest possible date for a new event, which is 20 working days
 * from today.
 */
export const getMinDate = (): Date => {
  let day = new Date();
  let c = 0;
  while (c < 20) {
    day = addDays(day, 1);
    if (!isSunday(day) && !isHoliday(day, HOLIDAY_REGION)) {
      c += 1;
    }
  }
  log('min date', day);
  return day;
};
