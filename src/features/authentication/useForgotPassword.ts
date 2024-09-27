import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useForgotPassword() {
  const { isPending, mutate } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => toast.success('Password reset link sent to your email'),
    onError: (err) => toast.error(err.message),
  });

  return { isSubmitting: isPending, forgotPassword: mutate };
}
