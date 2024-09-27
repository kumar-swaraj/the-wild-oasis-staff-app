import {
  HiBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import { IBooking, TRecentBookings } from '../bookings/booking.types';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

interface StatsProps {
  recentBookings: TRecentBookings;
  recentConfirmedStays: IBooking[];
  numDays: number;
  cabinsCount: number;
}

function Stats({
  recentBookings,
  recentConfirmedStays,
  numDays,
  cabinsCount,
}: StatsProps) {
  const numRecentBookings = recentBookings.length;

  const sales = recentBookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const checkins = recentConfirmedStays.length;

  // (num check in nights for certain period of time / all available nights in all cabins for certain period of time --> numDays * num cabins) * 100
  const occupancyRate =
    (
      (recentConfirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
        (numDays * cabinsCount)) *
      100
    ).toFixed(2) + '%';

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        color="blue"
        title="Bookings"
        value={numRecentBookings}
      />
      <Stat
        icon={<HiBanknotes />}
        color="green"
        title="Sales"
        value={formatCurrency(sales)}
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        color="indigo"
        title="Check ins"
        value={checkins}
      />
      <Stat
        icon={<HiOutlineChartBar />}
        color="yellow"
        title="Occupancy rate"
        value={occupancyRate}
      />
    </>
  );
}

export default Stats;
