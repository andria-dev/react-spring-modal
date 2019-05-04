import { ReactNode } from 'react';
import 'wicg-inert';
export interface IBaseModalProps {
    children: ReactNode;
    isOpen: boolean;
    onRequestClose: () => void;
}
declare function BaseModal({ isOpen, onRequestClose, children }: IBaseModalProps): JSX.Element;
export default BaseModal;
