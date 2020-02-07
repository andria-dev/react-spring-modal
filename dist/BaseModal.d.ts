import { ReactNode } from 'react';
export interface IBaseModalProps {
    children: ReactNode;
    isOpen: boolean;
    onRequestClose: () => void;
    autoFocus?: boolean;
}
declare function BaseModal({ isOpen, onRequestClose, children, autoFocus }: IBaseModalProps): JSX.Element;
export default BaseModal;
