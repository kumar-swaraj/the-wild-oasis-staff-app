import { ICabin } from '../cabins/cabin.types';

export interface IBooking {
  _id: string;
  createdAt: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: 'checked-in' | 'checked-out' | 'unconfirmed';
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabin: ICabin;
  guest: {
    _id: string;
    fullName: string;
    email: string;
    nationalID: string;
    nationality: string;
    countryFlag: string;
    createdAt: string;
    updatedAt: string;
  };
}

export type TRecentBookings = Pick<
  IBooking,
  '_id' | 'createdAt' | 'totalPrice' | 'extrasPrice' | 'cabin' | 'guest'
>[];
