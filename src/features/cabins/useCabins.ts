import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export function useCabins() {
  const { isPending, data, error } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  return { isLoading: isPending, error, cabins: data };
}
