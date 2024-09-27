import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CabinFormDataObj } from './cabin.types';
import { createEditCabin } from '../../services/apiCabins';

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      editedCabinData,
      id,
    }: {
      editedCabinData: Partial<CabinFormDataObj>;
      id?: string;
    }) => createEditCabin(editedCabinData, id),
    onSuccess: async () => {
      toast.success('Cabin successfully edited');

      await queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isEditing: isPending, editCabin: mutate };
}
