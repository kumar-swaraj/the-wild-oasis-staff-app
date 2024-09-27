import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting } from '../../services/apiSettings';
import toast from 'react-hot-toast';

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: updateSetting,

    onSuccess: async () => {
      toast.success('Setting successfully edited');

      await queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isUpdating: isPending, updateSettting: mutate };
}
