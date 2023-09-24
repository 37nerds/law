import Modal from "@components/modals/Modal";
import { TUserModalOpenFor } from "@kinds/users";
import ShowEditUserModal from "./ShowEditUserModal";
import ShowNewUserModal from "./ShowNewUserModal";

const UserModal = ({ modalOpenFor }: { modalOpenFor: TUserModalOpenFor | null }) => {

    return (
        <>
            {modalOpenFor && (
                <Modal>{modalOpenFor.type === "new_user" ? <ShowNewUserModal /> : <ShowEditUserModal />}</Modal>
            )}
        </>
    );
};

export default UserModal;
