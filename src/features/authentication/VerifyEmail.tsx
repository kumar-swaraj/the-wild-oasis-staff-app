import styled from 'styled-components';
import { RiMailAddLine } from 'react-icons/ri';
import { useVerifyEmail } from './useVerifyEmail';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';

const Span = styled.span`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  justify-content: center;
`;

function VerifyEmail() {
  const { isVerifyingEmail, verifyEmail } = useVerifyEmail();

  return (
    <Button
      $size="large"
      disabled={isVerifyingEmail}
      onClick={() => verifyEmail()}
    >
      {!isVerifyingEmail ? (
        <Span>
          <RiMailAddLine />
          <span>VERIFY EMAIL</span>
        </Span>
      ) : (
        <SpinnerMini />
      )}
    </Button>
  );
}

export default VerifyEmail;
