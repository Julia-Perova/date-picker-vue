import {
  endOfWeek,
  getDate,
  getDay,
  getDaysInMonth,
  getMonth,
  getWeeksInMonth,
  getYear,
  startOfWeek,
} from 'date-fns';

export const getDateObject = (date: Date | string) => {
  let dayOfWeek = 0;

  if (getDay(date) === 0) {
    dayOfWeek = 6;
  } else {
    dayOfWeek = getDay(date) - 1;
  }

  return {
    day: getDate(date),
    dayOfWeek,
    lastDay: getDaysInMonth(date),
    month: getMonth(date),
    weeksCount: getWeeksInMonth(date, { weekStartsOn: 1 }),
    year: getYear(date),
  };
};

export const getStartDayOfWeek = (date: Date | string) => {
  const { dayOfWeek } = getDateObject(date);

  if (dayOfWeek === 0) {
    return 1;
  }

  return getDate(startOfWeek(date, { weekStartsOn: 1 }));
};

export const getEndDayOfWeek = (date: Date | string) => {
  return getDate(endOfWeek(date, { weekStartsOn: 1 }));
};
