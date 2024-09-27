import { formatDistance } from 'date-fns';
import { differenceInDays } from 'date-fns/fp';

export const subtractDates = (date1: Date, date2: Date) =>
  differenceInDays(date1, date2);

export const formatDistanceFromNow = (date: Date | string | number) =>
  formatDistance(date, new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');

export const getToday = function (options?: { end: boolean }) {
  const today = new Date();

  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value
  );
