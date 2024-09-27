// import { useMemo } from 'react';
import { startOfMinute, subDays } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBookingsAfterDate } from '../../services/apiBookings';

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const last = searchParams.get('last');
  const numDays = !last ? 7 : Number(last);

  // const queryDate = useMemo(() => {
  //   const date = subDays(new Date(), numDays);
  //   date.setMilliseconds(0);
  //   return date.toISOString();
  // }, [numDays]);

  const queryDate = startOfMinute(subDays(new Date(), numDays)).toISOString();

  const { isPending, data } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ['bookings', `last ${numDays} days`, queryDate],
  });

  return { isRecentBookingsLoading: isPending, recentBookings: data };
}
