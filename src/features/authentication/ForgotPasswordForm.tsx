import { useState } from 'react';

import Form from '../../ui/Form';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import FormRowVertical from '../../ui/FormRowVertical';
import { useForgotPassword } from './useForgotPassword';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');

  const { isSubmitting, forgotPassword } = useForgotPassword();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    forgotPassword(trimmedEmail, {
      onSuccess: () => setEmail(''),
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address" labelFor="email">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="email"
          value={email}
          disabled={isSubmitting}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button $size="large">
          {!isSubmitting ? 'Submit' : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default ForgotPasswordForm;
