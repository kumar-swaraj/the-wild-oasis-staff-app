export interface SettingFormData {
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

export interface ISetting extends SettingFormData {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
