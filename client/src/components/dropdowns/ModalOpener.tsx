import { ReactNode } from "react";

const ModalOpener = ({
    children,
    onClick,
}: {
    children: ReactNode;
    onClick: () => void;
}) => {
    return (
        <label
            htmlFor="___the-modal"
            className="cursor-pointer"
            onClick={onClick}
        >
            {children}
        </label>
    );
};

export default ModalOpener;
