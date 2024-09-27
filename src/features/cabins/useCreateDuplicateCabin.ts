import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDuplicatCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useCreateDuplicateCabin() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: createDuplicatCabin,

    onSuccess: async () => {
      toast.success('Copy of cabin successfully created');

      await queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDuplicating: isPending, createDuplicateCabin: mutate };
}
