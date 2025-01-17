import styled from 'styled-components';
import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Spinner from './Spinner';
import { useUser } from '../features/authentication/useUser';

const FullPage = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }: PropsWithChildren) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  useEffect(
    function () {
      // 3. If there is NO authenticated user, redirect to /login
      if (!isLoading && !isAuthenticated) navigate('/login');
    },
    [isLoading, isAuthenticated, navigate]
  );

  // 2. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;

// note: navigate is only allowed to invoke inside any other functions like callback or an useEffect, so NOT at the top level in component
