import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

import Title from "@components/pure/Title";
import XIcon from "@components/icons/XIcon";

const Box = ({ isForm, children, onSubmit }: { isForm?: boolean; onSubmit?: () => void; children: ReactNode }) => {
    const className = `py-5`;
    return (
        <>
            {isForm ? (
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        onSubmit && onSubmit();
                    }}
                    className={className}
                >
                    {children}
                </form>
            ) : (
                <div className={className}>{children}</div>
            )}
        </>
    );
};

const Modal = ({
    open,
    setOpen,
    children,
    buttons = [],
    isForm = false,
    onSubmit,
    widthClass,
    title = "",
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
    children: ReactNode;
    buttons?: ReactNode[];
    isForm?: boolean;
    onSubmit?: () => void;
    widthClass?: string;
    title?: string;
}) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const closeRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (open) {
            dialogRef.current?.showModal();
        } else {
            closeRef.current?.click();
        }
    }, [open]);

    return (
        <>
            {open ? (
                <dialog ref={dialogRef} className="modal">
                    <div className={`modal-box rounded-lg ${widthClass} max-w-5xl p-8`}>
                        <div className="relative flex items-center justify-center py-3">
                            <Title className="text-center">{title}</Title>
                            <form method="dialog" className="absolute right-0 top-0">
                                <button
                                    ref={closeRef}
                                    className="btn"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <XIcon className="w-6" />
                                </button>
                            </form>
                        </div>
                        <Box isForm={isForm} onSubmit={onSubmit}>
                            {children}
                            <div className="modal-action">
                                {buttons.map((button, index) => (
                                    <div key={index}>{button}</div>
                                ))}
                            </div>
                        </Box>
                    </div>
                </dialog>
            ) : (
                <></>
            )}
        </>
    );
};

export default Modal;
