import React, { ReactNode, useEffect, useRef } from 'react';
import { useTransition } from 'react-spring';
import { ModalBackdrop } from './ModalBackdrop';
import { ModalPortal } from './ModalPortal';

import useLockBodyScroll from 'react-use/lib/useLockBodyScroll';

if (globalThis.document) {
  require('wicg-inert');
}

let root: HTMLElement | null = null;
if (globalThis.document) {
  root = document.getElementById('root');
  if (!root) {
    root = document.getElementById('__next');
  }
}

function getFocusable(element: HTMLElement): NodeListOf<HTMLElement> {
  return element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
}

export interface IBaseModalProps {
  children: ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
  autoFocus?: boolean;
}

export function BaseModal({
  isOpen,
  onRequestClose,
  children,
  autoFocus = true
}: IBaseModalProps) {
  useLockBodyScroll(isOpen);

  const lastActiveElement = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLElement>(null);

  const backdropTransition = useTransition(isOpen, null, {
    '--opacity': 0,
    from: { '--opacity': 0 },
    enter: { '--opacity': 0.5 },
    leave: { '--opacity': 0 },
    onRest() {
      if (autoFocus && modalRef.current && isOpen) {
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
    if (globalThis.window) {
      window.addEventListener('keyup', listener);
    }

    return () => {
      if (globalThis.window) {
        window.removeEventListener('keyup', listener);
      }
    };
  }, [onRequestClose]);

  useEffect(() => {
    if (isOpen) {
      if (globalThis.document) {
        lastActiveElement.current = document.activeElement as HTMLElement;
      }

      if (root) {
        root.setAttribute('inert', '');
      }
    } else {
      if (root) {
        root.removeAttribute('inert');
      }

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
