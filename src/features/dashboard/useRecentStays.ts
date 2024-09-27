// import { useMemo } from 'react';
import { startOfMinute, subDays } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '../../services/apiBookings';

export function useRecentStays() {
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
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ['stays', `last ${numDays} days`, queryDate],
  });

  const recentConfirmedStays = data?.filter(
    (stay) => stay.status === 'checked-in' || stay.status === 'checked-out'
  );

  return {
    isRecentStaysLoading: isPending,
    recentStays: data,
    recentConfirmedStays,
    numDays,
  };
}
