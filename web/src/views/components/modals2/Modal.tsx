import { ReactNode, useEffect, useRef } from "react";

const ModalBox = ({
    isForm,
    children,
    onSubmit,
    widthClass = "w-11/12",
}: {
    isForm?: boolean;
    onSubmit?: () => void;
    children: ReactNode;
    widthClass?: string;
}) => {
    const className = `modal-box ${widthClass} max-w-5xl p-8 `;

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
            <ModalBox isForm={isForm} onSubmit={onSubmit} widthClass={widthClass}>
                {children}
                <div className="modal-action">
                    <form method="dialog">
                        <button ref={closeRef} className="btn btn-error text-base-100" onClick={() => setOpen(false)}>
                            Close
                        </button>
                    </form>
                    {buttons.map((button, index) => (
                        <div key={index}>{button}</div>
                    ))}
                </div>
            </ModalBox>
        </dialog>
    );
};

export default Modal;
