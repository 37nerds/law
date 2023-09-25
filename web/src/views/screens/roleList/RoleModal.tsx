import Modal from "@components/modals/Modal";
import { TRoleModalOpenFor } from "@kinds/users";
import ShowEditRoleModal from "./ShowEditRoleModal";
import ShowNewRoleModal from "./ShowNewRoleModal";

const RoleModal = ({ modalOpenFor }: { modalOpenFor: TRoleModalOpenFor | null }) => {
    return (
        <>
            {modalOpenFor && (
                <Modal>{modalOpenFor.type === "new_role" ? <ShowNewRoleModal /> : <ShowEditRoleModal />}</Modal>
            )}
        </>
    );
};

export default RoleModal;
