import React from 'react';
import { animated, useTransition } from 'react-spring';
import BaseModal, { IBaseModalProps } from '../BaseModal';

import classNames from '@chbphone55/classnames';
import { ObjectOf } from '../generic-types';
import './style.css';

interface IProps extends IBaseModalProps, ObjectOf<any> {
  modalTransition?: ReturnType<typeof useTransition>;
}

function BottomModal({
  children,
  isOpen,
  onRequestClose,
  className,
  // eslint-disable-next-line react-hooks/rules-of-hooks
  modalTransition = useTransition(isOpen, null, {
    from: { transform: 'translateY(100%) translateX(-50%)' },
    enter: { transform: 'translateY(0%) translateX(-50%)' },
    leave: { transform: 'translateY(100%) translateX(-50%)' }
  }),
  ...props
}: IProps) {
  return (
    <BaseModal isOpen={isOpen} onRequestClose={onRequestClose}>
      {modalTransition.map(modal =>
        modal.item ? (
          <animated.div
            className={classNames('BottomModal shadow-lg', className)}
            key={modal.key}
            style={modal.props}
            {...props}
          >
            {children}
          </animated.div>
        ) : null
      )}
    </BaseModal>
  );
}

export default BottomModal;
