import { ReactNode } from "react";

const Modal = ({ children }: { children?: ReactNode }) => {
    return (
        <>
            <input type="checkbox" id="___the-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <div>{children}</div>
                    <div className="modal-action">
                        <label htmlFor="___the-modal" className="btn btn-neutral">
                            Close
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
