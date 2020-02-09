/// <reference types="react" />
interface IProps {
    children?: JSX.Element | JSX.Element[] | Array<JSX.Element | null>;
}
export declare function ModalPortal({ children }: IProps): import("react").ReactPortal | null;
export {};
