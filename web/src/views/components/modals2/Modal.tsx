import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { ReactNode, useEffect, useRef } from "react";

const Box = ({ isForm, children, onSubmit }: { isForm?: boolean; onSubmit?: () => void; children: ReactNode }) => {
    const className = `p-8`;

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
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
    children: ReactNode;
    buttons?: ReactNode[];
    isForm?: boolean;
    onSubmit?: () => void;
    widthClass?: string;
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
        <dialog ref={dialogRef} className="modal">
            <div className={`modal-box ${widthClass} max-w-5xl`}>
                <div className="flex justify-end">
                    <form method="dialog">
                        <button
                            ref={closeRef}
                            className="btn btn-neutral text-base-100"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <XMarkIcon className="w-6" />
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
    );
};

export default Modal;
