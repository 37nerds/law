import Modal from "@components/dropdowns/Modal";

import ShowClientInModal from "./ShowClientInModal";
import ShowUnitInModal from "./ShowUnitInModal";

export type TCustomerModalOpenFor = {
    id: number;
    type: "client" | "unit" | "company" | "group_of_company";
};

const CustomerModal = ({
    modalOpenFor,
}: {
    modalOpenFor: TCustomerModalOpenFor | null;
}) => {
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
