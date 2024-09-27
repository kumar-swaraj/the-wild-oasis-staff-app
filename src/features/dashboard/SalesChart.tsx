import styled from 'styled-components';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { TRecentBookings } from '../bookings/booking.types';
import DashboardBox from './DashboardBox';
import Heading from '../../ui/Heading';

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

interface SalesChartProps {
  recentBookings: TRecentBookings;
  numDays: number;
}

function SalesChart({ recentBookings, numDays }: SalesChartProps) {
  const { isDarkMode } = useDarkMode();

  const dates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });
  const data = dates.map((date) => ({
    label: format(date, 'MMM dd'),
    totalSales: recentBookings
      .filter((booking) => isSameDay(date, new Date(booking.createdAt)))
      .reduce((acc, cur) => acc + cur.totalPrice, 0),
    extrasSales: recentBookings
      .filter((booking) => isSameDay(date, new Date(booking.createdAt)))
      .reduce((acc, cur) => acc + cur.extrasPrice, 0),
  }));
  const colors = isDarkMode
    ? {
        totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
        extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
        text: '#e5e7eb',
        background: '#18212f',
      }
    : {
        totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
        extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
        text: '#374151',
        background: '#fff',
      };
  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(dates[0], 'MMM dd yyyy')} &mdash;{' '}
        {format(dates[dates.length - 1], 'MMM dd yyyy')}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ background: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            fill={colors.totalSales.fill}
            stroke={colors.totalSales.stroke}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            fill={colors.extrasSales.fill}
            stroke={colors.extrasSales.stroke}
            strokeWidth={2}
            name="Extra sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
