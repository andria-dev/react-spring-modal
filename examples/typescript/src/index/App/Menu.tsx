import * as React from 'react';
import {StateProps} from '../shared/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';
import {animated, useTransition} from 'react-spring';
import {BaseModal} from 'react-spring-modal/dist/index.m.js';
import './Menu/Menu.css';
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";

export function Menu({state, setState}: StateProps) {
  const isOpen = state.type === 'menu';
  const transition = useTransition(isOpen, null, {
    from: {transform: 'translateX(-100%)'},
    enter: {transform: 'translateX(0)'},
    leave: {transform: 'translateX(-100%)'},
  });

  function close() {
    setState({type: 'idle'});
  }

  return (
    <>
      <button
        className="Menu__button--circle Menu__button--open"
        onClick={() => setState({type: 'menu'})}
        title="Open navigation menu"
        aria-label="Open navigation menu"
      >
        <FontAwesomeIcon icon={faBars}/>
      </button>

      <BaseModal isOpen={isOpen} onRequestClose={close}>
        {transition.map(
          ({item, key, props}) =>
            item && (
              <animated.div key={key} style={props} className="Menu">
                <button onClick={close} className="Menu__button--circle Menu__button--close">
                  <FontAwesomeIcon icon={faTimes}/>
                </button>
                <a className="Menu__link" href="#" onClick={close}>
                  Home
                </a>
                <a className="Menu__link" href="#" onClick={close}>
                  About
                </a>
                <a className="Menu__link" href="#" onClick={close}>
                  Products
                </a>
                <a className="Menu__link" href="#" onClick={close}>
                  Contact
                </a>
                <a className="Menu__link" href="#" onClick={close}>
                  Jobs
                </a>
              </animated.div>
            ),
        )}
      </BaseModal>
    </>
  );
}
