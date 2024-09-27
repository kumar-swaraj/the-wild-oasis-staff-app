import { useBookings } from './useBookings';
import { IBooking } from './booking.types';

import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import Modal from '../../ui/Modal';
import BookingRow from './BookingRow';
import Spinner from '../../ui/Spinner';
import Pagination from '../../ui/Pagination';

function BookingTable() {
  const { isLoading, bookings, count } = useBookings();

  if (isLoading) return <Spinner />;
  if (!count) return <Empty resourceName="bookings" />;

  return (
    <Modal>
      <Menus>
        <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
          <Table.Header>
            <div>Cabin</div>
            <div>Guest</div>
            <div>Dates</div>
            <div>Status</div>
            <div>Amount</div>
            <div></div>
          </Table.Header>

          <Table.Body
            dataArr={bookings}
            render={(booking: IBooking) => (
              <BookingRow key={booking._id} booking={booking} />
            )}
          />
          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        </Table>
      </Menus>
    </Modal>
  );
}

export default BookingTable;
