import React from 'react';
import { ItemTransition } from 'react-spring';
import { ObjectOf } from '../generic-types';
import { IBaseModalProps } from '../BaseModal';
import './style.css';
interface IProps extends IBaseModalProps, ObjectOf<any> {
    modalTransition?: Array<ItemTransition<any, any>>;
}
export declare function useCenterModalTransition(isOpen: boolean, props?: ObjectOf<any>): {
    key: React.ReactText;
    item: boolean;
    phase: import("react-spring").TransitionPhase;
    props: {
        [x: string]: import("react-spring").AnimatedValue<any>;
        opacity: import("react-spring").AnimatedValue<number>;
    };
}[];
declare function CenterModal({ isOpen, onRequestClose, className, modalTransition, ...props }: IProps): JSX.Element;
export default CenterModal;
