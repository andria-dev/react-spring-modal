import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

interface IProps {
  children?: JSX.Element | JSX.Element[] | Array<JSX.Element | null>;
}

const modalRoot = globalThis.document
  ? document.querySelector('#modal-root')
  : null;

export function ModalPortal({ children }: IProps) {
  const node = useMemo(
    () => (globalThis.document ? document.createElement('div') : null),
    []
  );

  useEffect(() => {
    if (modalRoot && node) {
      modalRoot.appendChild(node);
    }
    return () => {
      if (modalRoot && node) {
        modalRoot.removeChild(node);
      }
    };
  }, [node]);

  return node ? createPortal(children, node) : null;
}
