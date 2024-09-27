import styled from 'styled-components';
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';
import { Link } from 'react-router-dom';
import ForgotPasswordForm from '../features/authentication/ForgotPasswordForm';

const ForgotPassworLayout = styled.main`
  min-height: 100dvh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const StyledDiv = styled.div`
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: var(--color-brand-600);
  font-weight: 500;
  transition: all 0.3s;
  padding-bottom: 2px;
  border-bottom: 2px solid transparent;

  &:hover,
  &:active {
    color: var(--color-brand-700);
    border-bottom-color: currentColor;
  }
`;

function ForgotPassword() {
  return (
    <ForgotPassworLayout>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      <ForgotPasswordForm />

      <StyledDiv>
        <StyledLink to="/login">Login</StyledLink>
      </StyledDiv>
    </ForgotPassworLayout>
  );
}

export default ForgotPassword;
