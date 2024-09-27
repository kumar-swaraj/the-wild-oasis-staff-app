import { SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateUserPassword } from './useUpdateUserPassword';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Form from '../../ui/Form';

interface IFormInputs {
  currentPassword: string;
  password: string;
  passwordConfirm: string;
}

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } =
    useForm<IFormInputs>();
  const { errors } = formState;

  const { isUpdatingUserPassword, updateUserPassword } =
    useUpdateUserPassword();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    updateUserPassword(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Current password"
        labelFor="currentPassword"
        error={errors.currentPassword?.message}
      >
        <Input
          type="password"
          id="currentPassword"
          autoComplete="current-password"
          disabled={isUpdatingUserPassword}
          {...register('currentPassword', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        labelFor="password"
        error={errors.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="new-password"
          disabled={isUpdatingUserPassword}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        labelFor="passwordConfirm"
        error={errors.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdatingUserPassword}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              getValues().password === value || 'Passwords need to match',
          })}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          $variation="secondary"
          onClick={() => reset()}
          disabled={isUpdatingUserPassword}
        >
          Cancel
        </Button>
        <Button disabled={isUpdatingUserPassword}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
