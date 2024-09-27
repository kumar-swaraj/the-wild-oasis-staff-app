import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import { useNavigate } from 'react-router-dom';

export function useCheckin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: string;
      breakfast?: {
        hasBreakfast: true;
        extrasPrice: number;
        totalPrice: number;
      };
    }) =>
      !breakfast
        ? updateBooking(bookingId, {
            status: 'checked-in',
            isPaid: true,
          })
        : updateBooking(bookingId, {
            status: 'checked-in',
            isPaid: true,
            ...breakfast,
          }),

    onSuccess: async (data) => {
      toast.success(`Booking #${data._id} successfully checked in`);
      await queryClient.invalidateQueries({
        queryKey: ['booking', data._id],
      });
      navigate('/');
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { checkin: mutate, isCheckingIn: isPending };
}
