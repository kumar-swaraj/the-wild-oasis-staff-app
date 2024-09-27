import styled from 'styled-components';
import Logo from '../ui/Logo';
import LoginForm from '../features/authentication/LoginForm';
import Heading from '../ui/Heading';
import { Link } from 'react-router-dom';

const LoginLayout = styled.main`
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

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />

      <StyledDiv>
        <StyledLink to="/forgot-password">Forgot password?</StyledLink>
      </StyledDiv>
    </LoginLayout>
  );
}

export default Login;
