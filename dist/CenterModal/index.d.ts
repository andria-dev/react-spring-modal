/// <reference types="react" />
import { useTransition } from 'react-spring';
import { ObjectOf } from '../generic-types';
import { IBaseModalProps } from '../BaseModal';
import './style.css';
interface IProps extends IBaseModalProps, ObjectOf<any> {
    modalTransition?: ReturnType<typeof useTransition>;
}
export declare function useCenterModalTransition(isOpen: boolean, props?: ObjectOf<any>): any;
declare function CenterModal({ isOpen, onRequestClose, className, modalTransition, ...props }: IProps): JSX.Element;
export default CenterModal;
