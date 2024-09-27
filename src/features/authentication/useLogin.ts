import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: login,

    onSuccess: (user) => {
      toast.success('You are successfully logged in');

      // manually setting query will make application seamless, and will be no need to fetch 'user' on /dashboard page after login, it will directly get from cache
      queryClient.setQueryData(['user'], () => user);
      navigate('/', { replace: true });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isLoggingIn: isPending, login: mutate };
}
