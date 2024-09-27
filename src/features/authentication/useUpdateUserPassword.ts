import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserPassword } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdateUserPassword() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: updateUserPassword,

    onSuccess: (user) => {
      toast.success('Your password successfully updated');
      queryClient.setQueryData(['user'], () => user);
    },

    onError: (err) => toast.error(err.message),
  });

  return { isUpdatingUserPassword: isPending, updateUserPassword: mutate };
}
