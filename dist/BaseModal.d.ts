import { ReactNode } from 'react';
export interface IBaseModalProps {
    children: ReactNode;
    isOpen: boolean;
    onRequestClose: () => void;
}
declare function BaseModal({ isOpen, onRequestClose, children }: IBaseModalProps): JSX.Element;
export default BaseModal;
