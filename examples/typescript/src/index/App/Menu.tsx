import * as React from 'react';
import { StateProps } from '../shared/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { ExpandModal, ModalCloseTarget } from 'react-spring-modal/dist/commonjs/index';
import './Menu/Menu.css';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

export function Menu({ state, setState }: StateProps) {
  const isOpen = state.type === 'menu';
  function close() {
    setState({ type: 'idle' });
  }

  return (
    <>
      <button
        className="Menu__button--circle Menu__button--open circle-icon-button"
        onClick={() => setState({ type: 'menu' })}
        title="Open navigation menu"
        aria-label="Open navigation menu"
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-live="polite"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      <ExpandModal isOpen={isOpen} onDismiss={close} x={0} contentProps={{ className: 'Menu', as: 'nav' }}>
        <ModalCloseTarget>
          <button
            className="Menu__button--circle Menu__button--close circle-icon-button"
            aria-label="Close navigation menu"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <a className="Menu__link Menu__link--active" href="#home" aria-current="page">
            Home
          </a>
          <a className="Menu__link" href="#about">
            About
          </a>
          <a className="Menu__link" href="#products">
            Products
          </a>
          <a className="Menu__link" href="#contact">
            Contact
          </a>
          <a className="Menu__link" href="#jobs">
            Jobs
          </a>
        </ModalCloseTarget>
      </ExpandModal>
    </>
  );
}
