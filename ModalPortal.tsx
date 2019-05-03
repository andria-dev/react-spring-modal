import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

interface IProps {
  children?: JSX.Element | JSX.Element[] | Array<JSX.Element | null>;
}

const modalRoot = document.querySelector('#modal-root')!;
function ModalPortal({ children }: IProps) {
  const node = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    modalRoot.appendChild(node);
    return () => {
      modalRoot.removeChild(node);
    };
  }, [node]);

  return createPortal(children, node);
}

export default ModalPortal;
