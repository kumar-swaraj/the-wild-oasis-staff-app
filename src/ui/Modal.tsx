import React, {
  cloneElement,
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { HiXMark } from 'react-icons/hi2';
import { useOutsideClick } from '../hooks/useOutsideClick';

const StyledModal = styled.div.attrs(() => ({
  role: 'dialog',
  'aria-modal': true,
}))`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

interface IModalContext {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

interface OpenProps {
  opens: string;
  children: React.ReactElement;
}

interface WindowProps {
  name: string;
  children: React.ReactElement;
}

const ModalContext = createContext<IModalContext | null>(null);

function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }

  return context;
}

function Modal({ children }: PropsWithChildren) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider
      value={{
        openName,
        close,
        open,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function Open({ opens: opensWindowName, children }: OpenProps) {
  const { open } = useModalContext();

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ name, children }: WindowProps) {
  const { openName, close } = useModalContext();

  const modalRef = useOutsideClick<HTMLDivElement>(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={modalRef}>
        <Button onClick={close}>
          <HiXMark />
        </Button>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

/*

function Window({ name, children }: WindowProps) {
  const { openName, close } = useModalContext();

  const modalRef = useRef<HTMLDivElement>(null);

  // Remember, this effect will be registered even if Modal is not opened, because this Window Component would be present in Component tree, it is just that it is not adding something to the dom.
  // so as soon as this effect registered, click event listener should have been added to the dom.
  // But, modalRef.current would be null, if it is not adding JSX to the dom.
  // so at that moment of time, handleClick can't do anything, because it depends on the existence of modalRef.current

  // And, when we try to perform any action (usually click) on any element of dom that opens the Modal, technically JSX would be added to the dom, and mutate modalRef.current as HTMLDivElement, then during bubbling phase, Modal would be open for couple of millieseconds, but handleClick would be invoked and it will immediately close the Modal as per logic because the inital action would have performed on an element which does not contains Modal.

  // so moral of the story is that, we need to listen the click event during capturing phase.
  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (
          modalRef.current &&
          !modalRef.current.contains(e.target as HTMLElement)
        ) {
          close();
        }
      }
      document.addEventListener('click', handleClick, true);

      // Remember, modalRef.current would have become null when this cleanup function will run, However we just removing EventListener, not adding, handleClick will never runs when we invoke removeEventListener.
      return () => document.removeEventListener('click', handleClick, true);
    },
    [close]
  );

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={modalRef}>
        <Button onClick={close}>
          <HiXMark />
        </Button>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

*/
