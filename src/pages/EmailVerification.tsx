import styled from 'styled-components';
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';
import VerifyEmail from '../features/authentication/VerifyEmail';

const EmailVerificationLayout = styled.div`
  min-height: 100dvh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const P = styled.p`
  text-align: center;
`;

function EmailVerification() {
  return (
    <EmailVerificationLayout>
      <Logo />
      <Heading as="h4">Verify your email address</Heading>
      <P>
        Please click the button below to verify your email address and activate
        you account.
      </P>
      <VerifyEmail />
    </EmailVerificationLayout>
  );
}

export default EmailVerification;
