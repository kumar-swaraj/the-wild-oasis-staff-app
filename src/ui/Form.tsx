import styled, { css } from 'styled-components';

interface FormProps {
  $type?: 'modal' | 'regular';
}

const Form = styled.form.attrs<FormProps>((props) => ({
  $type: props.$type ?? 'regular',
}))`
  ${(props) =>
    props.$type === 'regular' &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.$type === 'modal' &&
    css`
      width: 80rem;
      padding: 1px;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

export default Form;
