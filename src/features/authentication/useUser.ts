import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiUser';

export function useUser() {
  const { isPending, data } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    retry: false,
  });

  const isAuthenticated = Boolean(data);

  return { isLoading: isPending, isAuthenticated, user: data };
}
