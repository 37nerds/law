import type { ReactNode } from "react";
import type { TCustomerModalOpenFor } from "../../queries/customers/customers_type";

import ShowClientInModal from "./ShowClientInModal";
import ShowUnitInModal from "./ShowUnitInModal";

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

const CustomerModal = ({ modalOpenFor }: { modalOpenFor: TCustomerModalOpenFor | null }) => {
    return (
        <>
            {modalOpenFor && (
                <Modal>
                    {modalOpenFor.type === "client" ? (
                        <ShowClientInModal id={modalOpenFor.id} />
                    ) : modalOpenFor.type === "unit" ? (
                        <ShowUnitInModal id={modalOpenFor.id} />
                    ) : (
                        <></>
                    )}
                </Modal>
            )}
        </>
    );
};

export default CustomerModal;
