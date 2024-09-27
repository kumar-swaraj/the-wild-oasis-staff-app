import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { logout } from '../../services/apiAuth';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: logout,

    onSuccess: () => {
      toast.success('You are successfully logged out');
      queryClient.removeQueries({ type: 'all' });
      navigate('/login', { replace: true });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isLoggingOut: isPending, logout: mutate };
}
