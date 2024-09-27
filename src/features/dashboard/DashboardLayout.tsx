import styled from 'styled-components';

import { useCabins } from '../cabins/useCabins';
import { useRecentStays } from './useRecentStays';
import { useRecentBookings } from './useRecentBookings';

import Stats from './Stats';
import SalesChart from './SalesChart';
import Spinner from '../../ui/Spinner';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isRecentBookingsLoading, recentBookings } = useRecentBookings();
  const { isRecentStaysLoading, recentConfirmedStays, numDays } =
    useRecentStays();
  const { isLoading: isCabinsLoading, cabins } = useCabins();

  if (isRecentBookingsLoading || isRecentStaysLoading || isCabinsLoading)
    return <Spinner />;

  // Just for TS
  if (!recentBookings || !recentConfirmedStays || !cabins)
    return <p>There is nothing to show here.</p>;

  return (
    <StyledDashboardLayout>
      <Stats
        recentBookings={recentBookings}
        recentConfirmedStays={recentConfirmedStays}
        numDays={numDays}
        cabinsCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart recentConfirmedStays={recentConfirmedStays} />
      <SalesChart recentBookings={recentBookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
