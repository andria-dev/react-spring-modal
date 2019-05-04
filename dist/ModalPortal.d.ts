/// <reference types="react" />
interface IProps {
    children?: JSX.Element | JSX.Element[] | Array<JSX.Element | null>;
}
declare function ModalPortal({ children }: IProps): import("react").ReactPortal | null;
export default ModalPortal;
