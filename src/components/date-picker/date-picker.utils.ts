import { format, isWeekend } from 'date-fns';

import { getDateObject, getEndDayOfWeek, getStartDayOfWeek } from '@/utils/date.utils';
import type { CalendarDay } from './date-picker.interfaces';
import { DAYS_OF_WEEK_COUNT } from './date-picker.constants';

const getCalendarDay = (
  year: number,
  month: number,
  day: number,
  isCurrentMonth = false,
): CalendarDay => {
  const newDate = new Date(year, month, day);
  const formattedDate = format(newDate, 'yyyy-MM-dd');

  return {
    day,
    formattedDate,
    isCurrentMonth,
    isWeekend: isWeekend(newDate),
  };
};

export const generateDaysPrevMonth = (date: Date, start: number) => {
  const result = [];
  const { dayOfWeek, month, year } = getDateObject(date);

  let day = start;
  for (let i = 0; i < dayOfWeek; i++) {
    result[i] = getCalendarDay(year, month - 1, day);
    day++;
  }
  return result;
};

export const generateDaysNextMonth = (date: Date, end: number) => {
  const result = [];
  const { month, year } = getDateObject(date);

  let day = 1;

  for (let i = 0; i < end; i++) {
    result[i] = getCalendarDay(year, month + 1, day);
    day++;
  }

  return result;
};

export const generateDaysCurrentMonth = (date: Date) => {
  const result: CalendarDay[] = [];
  const { lastDay, month, year } = getDateObject(date);

  let day = 1;
  for (let i = 0; i < lastDay; i++) {
    result[i] = getCalendarDay(year, month, day, true);
    day++;
  }

  return result;
};

export const generateDaysList = (date: Date) => {
  let list: CalendarDay[] = generateDaysCurrentMonth(date);
  let startList: CalendarDay[] = [];
  let endList: CalendarDay[] = [];

  const { day, lastDay, month, weeksCount, year } = getDateObject(date);

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month, lastDay);

  const startDayOfWeek = getStartDayOfWeek(startDate);
  const endDayOfWeek = getEndDayOfWeek(endDate);

  const dayInList = weeksCount * DAYS_OF_WEEK_COUNT;

  if (startDayOfWeek !== 1) {
    startList = generateDaysPrevMonth(startDate, startDayOfWeek);
  }

  if (endDayOfWeek !== lastDay) {
    const limit = dayInList - lastDay - startList.length;
    endList = generateDaysNextMonth(endDate, limit);
  }

  return [...startList, ...list, ...endList];
};
