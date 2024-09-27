import { SubmitHandler, useForm } from 'react-hook-form';

import Form from '../../ui/Form';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import { useSignup } from './useSignup';

// Email regex: /\S+@\S+\.\S+/

interface IFormInputs {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } =
    useForm<IFormInputs>();
  const { errors } = formState;

  const { isSigningUp, signup } = useSignup();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    signup(data, {
      onSettled: () => reset(),
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Full name"
        labelFor="fullName"
        error={errors.fullName?.message}
      >
        <Input
          type="text"
          id="fullName"
          disabled={isSigningUp}
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow
        label="Email address"
        labelFor="email"
        error={errors.email?.message}
      >
        <Input
          type="email"
          id="email"
          disabled={isSigningUp}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please, provide a valid email address',
            },
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
          disabled={isSigningUp}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password need a minimum of 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        labelFor="passwordConfirm"
        error={errors.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSigningUp}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Passwords need to match ',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          type="reset"
          disabled={isSigningUp}
          onClick={() => reset()}
        >
          Cancel
        </Button>
        <Button disabled={isSigningUp}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
