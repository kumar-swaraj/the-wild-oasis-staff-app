import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserData } from '../../services/apiUser';
import toast from 'react-hot-toast';

export function useUpdateUserData() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: updateUserData,

    onSuccess: (user) => {
      toast.success('User account successfully updated');
      queryClient.setQueryData(['user'], () => user);
    },

    onError: (err) => toast.error(err.message),
  });

  return { isUpdatingUserData: isPending, updateUserData: mutate };
}
