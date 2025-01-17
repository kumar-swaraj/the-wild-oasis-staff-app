import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

interface FormRowVerticalProps {
  label?: string;
  labelFor?: string;
  error?: string;
}

function FormRowVertical({
  label,
  labelFor,
  error,
  children,
}: PropsWithChildren<FormRowVerticalProps>) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={labelFor}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
