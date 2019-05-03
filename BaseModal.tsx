import React, { ReactNode, useEffect, useRef } from 'react';
import { useTransition } from '../../hooks';
import ModalBackdrop from './ModalBackdrop';
import ModalPortal from './ModalPortal';

import useLockBodyScroll from 'react-use/lib/useLockBodyScroll';

import 'wicg-inert';
import { fast } from '../../spring-configs';

const root = document.getElementById('root')!;
function getFocusable(element: HTMLElement): NodeListOf<HTMLElement> {
  return element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
}

export interface IBaseModalProps {
  children: ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
}

function BaseModal({ isOpen, onRequestClose, children }: IBaseModalProps) {
  useLockBodyScroll(isOpen);

  const lastActiveElement = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLElement>(null);

  const backdropTransition = useTransition(isOpen, null, {
    '--opacity': 0,
    from: { '--opacity': 0 },
    enter: { '--opacity': 0.5 },
    leave: { '--opacity': 0 },
    config: fast,
    onRest() {
      if (modalRef.current && isOpen) {
        const focusableElements = getFocusable(modalRef.current);
        if (focusableElements.length) {
          focusableElements[0].focus();
        }
      }
    }
  });

  // Close on Escape
  useEffect(() => {
    function listener(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onRequestClose();
      }
    }
    window.addEventListener('keyup', listener);

    return () => {
      window.removeEventListener('keyup', listener);
    };
  }, [onRequestClose]);

  useEffect(() => {
    if (isOpen) {
      lastActiveElement.current = document.activeElement as HTMLElement;
      root.setAttribute('inert', '');
    } else {
      root.removeAttribute('inert');

      // wait for inert to wear off then focus
      setTimeout(() => {
        if (lastActiveElement.current) {
          lastActiveElement.current.focus();
        }
      }, 0);
    }
  }, [isOpen]);

  return (
    <ModalPortal>
      {backdropTransition.map(backdrop =>
        backdrop.item ? (
          <ModalBackdrop
            key={backdrop.key}
            className="BottomModal__backdrop"
            style={backdrop.props}
            onClick={onRequestClose}
            aria-modal="true"
            role="dialog"
            ref={modalRef}
          >
            {children}
          </ModalBackdrop>
        ) : null
      )}
    </ModalPortal>
  );
}

export default BaseModal;
