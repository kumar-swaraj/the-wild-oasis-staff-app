import { SubmitHandler, useForm } from 'react-hook-form';
import { useResetPassword } from './useResetPassword';

import Form from '../../ui/Form';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import FormRowVertical from '../../ui/FormRowVertical';

interface IFormInputs {
  password: string;
  passwordConfirm: string;
}

function ResetPasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } =
    useForm<IFormInputs>();
  const { errors } = formState;

  const { isResettingPassword, resetPassword } = useResetPassword();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    resetPassword(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical
        label="Password (min 8 characters)"
        labelFor="password"
        error={errors.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="new-password"
          disabled={isResettingPassword}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical
        label="Confirm password"
        labelFor="passwordConfirm"
        error={errors.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          autoComplete="new-password"
          disabled={isResettingPassword}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              getValues().password === value || 'Passwords need to match',
          })}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button disabled={isResettingPassword}>
          {!isResettingPassword ? 'Reset password' : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default ResetPasswordForm;
