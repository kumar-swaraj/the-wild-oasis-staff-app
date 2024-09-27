import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';

export function useSettings() {
  const { isPending, error, data } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  });

  return { isLoading: isPending, error, settings: data };
}
