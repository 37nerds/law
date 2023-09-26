import { TCustomerModalOpenFor } from "@fetches/customers/customers-type";

import Modal from "../../components/modals/Modal";
import ShowClientInModal from "./ShowClientInModal";
import ShowUnitInModal from "./ShowUnitInModal";

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
