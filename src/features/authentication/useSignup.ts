import { useMutation } from '@tanstack/react-query';
import { signup } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignup() {
  const { isPending, mutate } = useMutation({
    mutationFn: signup,

    onSuccess: () => {
      toast.success(
        "Account successfully created! An email has been sent on user's email for email verification. To activate this newly created account, user needs to verify their email address",
        {
          duration: 12000,
        }
      );
    },

    onError: (err) => toast.error(err.message),
  });

  return { isSigningUp: isPending, signup: mutate };
}
