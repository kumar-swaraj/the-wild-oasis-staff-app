import { getToday } from '../utils/helpers';
import { PAGE_SIZE } from '../utils/constants';
import { IBooking, TRecentBookings } from '../features/bookings/booking.types';

const URL = import.meta.env.VITE_SERVER_URL;

interface ErrorResponse {
  status: string;
  message: string;
}

export async function getBookings({
  filter,
  sortBy,
  currentPage,
}: {
  filter: {
    field: string;
    value: string;
    method?: 'lt' | 'lte' | 'gt' | 'gte';
  } | null;
  sortBy: { field: string; direction: 'asc' | 'desc' };
  currentPage: number;
}) {
  let query = '?';

  // SORTING
  const modifier = sortBy.direction === 'asc' ? '' : '-';
  query = query + `sort=${modifier + sortBy.field}`;

  // FILTERING
  if (filter) {
    query =
      query +
      `&${filter.field}${filter.method ? `[${filter.method}]` : ''}=${
        filter.value
      }`;
  }

  // PAGINATION
  query = query + `&limit=${PAGE_SIZE}&page=${currentPage}`;

  const res = await fetch(`${URL}/bookings${query}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    const errData = (await res.json()) as ErrorResponse;
    console.error(errData.message);
    throw new Error(errData.message);
    // throw new Error('Bookings could not be loaded.');
  }

  const data = (await res.json()) as {
    status: 'success';
    data: { bookings: IBooking[] };
    results: number;
    totalDocuments: number;
  };

  return { bookings: data.data.bookings, count: data.totalDocuments };
}

export async function getBooking(id: string) {
  const res = await fetch(`${URL}/bookings/${id}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    const errData = (await res.json()) as ErrorResponse;
    console.error(errData.message);
    throw new Error(errData.message);
    // throw new Error('Bookings could not be loaded.');
  }

  const data = (await res.json()) as {
    status: 'success';
    data: { booking: IBooking };
  };

  return data.data.booking;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string) {
  const res = await fetch(
    `${URL}/bookings?&fields=createdAt,totalPrice,extrasPrice&createdAt[gte]=${date}&createdAt[lte]=${getToday(
      { end: true }
    )}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );

  if (!res.ok) {
    const errData = (await res.json()) as ErrorResponse;
    console.error(errData.message);
    throw new Error(errData.message);
    // throw new Error('Bookings could not be loaded')
  }

  const data = (await res.json()) as {
    status: 'success';
    data: {
      bookings: TRecentBookings;
    };
  };

  return data.data.bookings;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const res = await fetch(
    `${URL}/bookings?startDate[gte]=${date}&startDate[lte]=${getToday()}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );

  if (!res.ok) {
    const errData = (await res.json()) as ErrorResponse;
    console.error(errData.message);
    throw new Error(errData.message);
    // throw new Error('Bookings could not be loaded')
  }

  const data = (await res.json()) as {
    status: 'success';
    data: {
      bookings: IBooking[];
    };
  };

  return data.data.bookings;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const res = await fetch(`${URL}/bookings/stays-today-activity`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    const errData = (await res.json()) as ErrorResponse;
    console.error(errData.message);
    throw new Error(errData.message);
    // throw new Error('Bookings could not be loaded')
  }

  const data = (await res.json()) as {
    status: 'success';
    results: number;
    data: {
      stays: {
        _id: string;
        createdAt: string;
        numNights: number;
        status: 'unconfirmed' | 'checked-in';
        guest: {
          fullName: string;
          nationality: string;
          countryFlag: string;
        };
      }[];
    };
  };

  return data.data.stays;
}

export async function updateBooking(id: string, booking: Partial<IBooking>) {
  const res = await fetch(`${URL}/bookings/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(booking),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errData = (await res.json()) as ErrorResponse;
    console.error(errData.message);
    throw new Error(errData.message);
    // throw new Error('Booking could not be updated');
  }

  const data = (await res.json()) as {
    status: 'succes';
    data: {
      booking: IBooking;
    };
  };

  return data.data.booking;
}

export async function deleteBooking(id: string) {
  const res = await fetch(`${URL}/bookings/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    const errData = (await res.json()) as ErrorResponse;
    console.error(errData.message);
    throw new Error(errData.message);
    // throw new Error('Booking could not be deleted');
  }
}
