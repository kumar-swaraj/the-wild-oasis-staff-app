import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../../services/apiAuth';
import { PasswordData } from './user.types';

export function useResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: async (passwordData: PasswordData) => {
      const resetToken = searchParams.get('resetToken');

      if (!resetToken) {
        throw new Error('Incorrect reset password link! Token not found');
      }

      await resetPassword({ resetToken, passwords: passwordData });
    },

    onSuccess: (user) => {
      toast.success('Your password has been successfully updated');
      queryClient.setQueryData(['user'], user);
      navigate('/', { replace: true });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isResettingPassword: isPending, resetPassword: mutate };
}
