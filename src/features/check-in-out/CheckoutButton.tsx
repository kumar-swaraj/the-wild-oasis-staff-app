import Button from '../../ui/Button';
import { useCheckout } from './useCheckout';

interface CheckoutButtonProps {
  bookingId: string;
}

function CheckoutButton({ bookingId }: CheckoutButtonProps) {
  const { isCheckingOut, checkout } = useCheckout();

  return (
    <Button
      $variation="primary"
      $size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
