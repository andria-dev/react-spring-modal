/// <reference types="react" />
import { useTransition } from 'react-spring';
import { IBaseModalProps } from '../BaseModal';
import { ObjectOf } from '../generic-types';
import './style.css';
interface IProps extends IBaseModalProps, ObjectOf<any> {
    modalTransition?: ReturnType<typeof useTransition>;
}
export declare function useBottomModalTransition(isOpen: boolean, props?: ObjectOf<any>): any;
declare function BottomModal({ children, isOpen, onRequestClose, className, modalTransition, style, ...props }: IProps): JSX.Element;
export default BottomModal;
