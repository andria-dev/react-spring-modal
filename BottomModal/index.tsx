import React from 'react';
import { animated, useTransition } from 'react-spring';
import { BaseModal, IBaseModalProps } from '../BaseModal';

import { classNames } from '@chbphone55/classnames';
import { ObjectOf } from '../generic-types';
import './style.css';

interface IProps extends IBaseModalProps, ObjectOf<any> {
  modalTransition?: ReturnType<typeof useTransition>;
}

export function useBottomModalTransition(
  isOpen: boolean,
  props: ObjectOf<any> = {}
) {
  return useTransition(isOpen, null, {
    // @ts-ignore
    from: { transform: 'translateY(100%) translateX(-50%)' },
    // @ts-ignore
    enter: { transform: 'translateY(0%) translateX(-50%)' },
    // @ts-ignore
    leave: { transform: 'translateY(100%) translateX(-50%)' },
    ...props
  });
}

export function BottomModal({
  children,
  isOpen,
  autoFocus,
  onRequestClose,
  className,
  modalTransition = useBottomModalTransition(isOpen),
  style = {},
  ...props
}: IProps) {
  return (
    <BaseModal isOpen={isOpen} onRequestClose={onRequestClose} autoFocus={autoFocus}>
      {modalTransition.map(({ item, key, props: transitionStyles }) =>
        item ? (
          <animated.div
            className={classNames('BottomModal shadow-lg', className)}
            key={key}
            style={{ ...transitionStyles, ...style }}
            {...props}
          >
            {children}
          </animated.div>
        ) : null
      )}
    </BaseModal>
  );
}