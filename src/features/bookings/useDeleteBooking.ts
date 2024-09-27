import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (bookingId: string) => deleteBooking(bookingId),

    onSuccess: async () => {
      toast.success('Booking successfully deleted');
      await queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isDeleting: isPending, deleteBooking: mutate };
}
