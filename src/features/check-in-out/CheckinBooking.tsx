import styled from 'styled-components';
import { useEffect, useState } from 'react';

import { useCheckin } from './useCheckin';
import { useBooking } from '../bookings/useBooking';
import { useSettings } from '../settings/useSettings';
import { useMoveBack } from '../../hooks/useMoveBack';
import { formatCurrency } from '../../utils/helpers';

import Row from '../../ui/Row';
import Button from '../../ui/Button';
import Heading from '../../ui/Heading';
import Spinner from '../../ui/Spinner';
import Checkbox from '../../ui/Checkbox';
import ButtonText from '../../ui/ButtonText';
import ButtonGroup from '../../ui/ButtonGroup';
import BookingDataBox from '../../features/bookings/BookingDataBox';
import Empty from '../../ui/Empty';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();

  const { isLoading, booking } = useBooking();
  const { isLoading: isLoadingSetting, settings } = useSettings();

  const [confirmPaid, setConfirmPaid] = useState(false);

  useEffect(
    function () {
      setConfirmPaid(booking?.isPaid ?? false);
    },
    [booking]
  );

  const [addBreakfast, setAddBreakfast] = useState(false);

  useEffect(
    function () {
      setAddBreakfast(booking?.hasBreakfast ?? false);
    },
    [booking]
  );

  const { isCheckingIn, checkin } = useCheckin();

  if (isLoading || isLoadingSetting) return <Spinner />;

  if (!booking) return <Empty resourceName="checkin" />;
  if (!settings) return <Empty resourceName="setting" />;

  if (booking.status !== 'unconfirmed')
    return (
      <div>
        <Button $variation="secondary" onClick={moveBack}>
          &larr; Back
        </Button>
        <p style={{ marginTop: '2rem' }}>
          It appears that the guest has already been{' '}
          {booking.status.replace('-', ' ')}.
        </p>
      </div>
    );

  const {
    _id: bookingId,
    guest,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    numGuests * settings.breakfastPrice * numNights;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId });
    }
  }

  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="add-breakfast"
            checked={addBreakfast}
            disabled={booking.hasBreakfast || isCheckingIn}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="confirm"
          checked={confirmPaid}
          disabled={(booking.isPaid && confirmPaid) || isCheckingIn}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
        >
          I confirm that {guest.fullName} has paid the total amount of{' '}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
