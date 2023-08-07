import Modal from "@components/dropdowns/Modal";
import ShowClientInModal from "./ShowClientInModal";

export type TModalOpenFor = {
    id: number;
    type: string;
};

const CustomerModal = ({
    modalOpenFor,
}: {
    modalOpenFor: TModalOpenFor | null;
}) => {
    return (
        <>
            {modalOpenFor && (
                <Modal>
                    {modalOpenFor.type === "client" ? (
                        <ShowClientInModal id={modalOpenFor.id} />
                    ) : (
                        <></>
                    )}
                </Modal>
            )}
        </>
    );
};

export default CustomerModal;
