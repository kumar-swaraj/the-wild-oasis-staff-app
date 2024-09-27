import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

import Form from '../../ui/Form';
import Input from '../../ui/Input';
import FormRow from '../../ui/FormRow';
import Spinner from '../../ui/Spinner';
import toast from 'react-hot-toast';
import { SettingFormData } from './settings.types';

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();
  const { isUpdating, updateSettting } = useUpdateSetting();

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings ?? {};

  function handleUpdate(
    e: React.FocusEvent<HTMLInputElement>,
    field: keyof SettingFormData
  ) {
    const valueStr = e.target.value;

    if (valueStr === '') {
      return toast.error('Field can not be empty');
    }

    const value = Number(valueStr);

    if (isNaN(value) || value < 0) {
      return toast.error('Value should atleast be greater than or equal to 0');
    }

    if (
      field === 'minBookingLength' &&
      maxBookingLength &&
      value > maxBookingLength
    ) {
      return toast.error(
        'Minimum nights/booking should be lesser than or equal to Maximum nights/booking'
      );
    }

    if (
      field === 'maxBookingLength' &&
      minBookingLength &&
      value < minBookingLength
    ) {
      return toast.error(
        'Maximum nights/booking should be lesser than or equal to Minimum nights/booking'
      );
    }

    updateSettting({ [field]: value });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
