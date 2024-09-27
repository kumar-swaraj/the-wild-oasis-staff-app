import { useNavigate } from 'react-router-dom';

// LINTING: useNavigate() always returns a 'function' type but here eslint raising a false positive error

export function useMoveBack() {
  const navigate = useNavigate();

  return () => navigate(-1);
}
