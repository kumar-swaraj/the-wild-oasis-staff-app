import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteCabin } from '../../services/apiCabins';

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    // mutationFn: (id: string) => deleteCabin(id),
    mutationFn: deleteCabin,
    onSuccess: async () => {
      toast.success('Cabin successfully deleted');

      await queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting: isPending, deleteCabin: mutate };
}
