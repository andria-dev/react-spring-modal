/// <reference types="react" />
import { ItemTransition } from 'react-spring';
import { IBaseModalProps } from '../BaseModal';
import { ObjectOf } from '../generic-types';
import './style.css';
interface IProps extends IBaseModalProps, ObjectOf<any> {
    modalTransition?: Array<ItemTransition<any, any>>;
}
declare function BottomModal({ children, isOpen, onRequestClose, className, modalTransition, ...props }: IProps): JSX.Element;
export default BottomModal;
