import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';

export function useCheckout() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (bookingId: string) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),

    onSuccess: async (data) => {
      toast.success(`Booking #${data._id} successfully checked out`);
      await queryClient.invalidateQueries({
        type: 'active',
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { checkout: mutate, isCheckingOut: isPending };
}
