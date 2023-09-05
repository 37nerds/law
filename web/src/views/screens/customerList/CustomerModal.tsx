import Modal from "@components/modals/Modal";
import ShowClientInModal from "@screens/customerList/ShowClientInModal";
import ShowUnitInModal from "@screens/customerList/ShowUnitInModal";

export type TCustomerModalOpenFor = {
    id: number;
    type: "client" | "unit" | "company" | "group_of_company";
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
