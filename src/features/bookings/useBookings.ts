import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBookings } from '../../services/apiBookings';
import { PAGE_SIZE } from '../../utils/constants';

type TSortableFields = 'startDate' | 'totalPrice';

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTERING
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  // SORTING
  const sortByRaw = searchParams.get('sortBy') ?? 'startDate-desc';
  const [field, direction] = sortByRaw.split('-') as [
    TSortableFields,
    'asc' | 'desc'
  ];
  const sortBy = { field, direction };

  // PAGINATION
  const page = searchParams.get('page');
  const currentPage = !page ? 1 : Number(page);

  // QUERY
  const { isPending, data, error } = useQuery({
    queryKey: ['bookings', filter, sortBy, currentPage],
    queryFn: () => getBookings({ filter, sortBy, currentPage }),
  });

  // PRE-FETCHING
  if (data) {
    const pagesCount = Math.ceil(data.count / PAGE_SIZE);

    // next page
    if (currentPage < pagesCount) {
      void queryClient.prefetchQuery({
        queryKey: ['bookings', filter, sortBy, currentPage + 1],
        queryFn: () =>
          getBookings({ filter, sortBy, currentPage: currentPage + 1 }),
      });
    }

    // previous page
    if (currentPage > 1) {
      void queryClient.prefetchQuery({
        queryKey: ['bookings', filter, sortBy, currentPage - 1],
        queryFn: () =>
          getBookings({ filter, sortBy, currentPage: currentPage - 1 }),
      });
    }
  }

  return {
    isLoading: isPending,
    error,
    bookings: data?.bookings,
    count: data?.count,
  };
}

/*

note: filter.method will be useful if the filter.field is something like numerical field i.e., 'totalPrice', then method can be 'lt' | 'lte' | 'gt' | 'gte'.

*/
