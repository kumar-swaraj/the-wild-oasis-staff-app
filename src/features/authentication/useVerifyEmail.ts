import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifyEmail } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useVerifyEmail() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const emailVerificationToken = searchParams.get('emailVerificationToken');

      if (!emailVerificationToken) {
        throw new Error('Incorrect verify email link! Token not found');
      }

      await verifyEmail(emailVerificationToken);
    },

    onSuccess: (user) => {
      toast.success('Your email has been verified successfully');
      queryClient.setQueryData(['user'], user);
      navigate('/', { replace: true });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isVerifyingEmail: isPending, verifyEmail: mutate };
}
