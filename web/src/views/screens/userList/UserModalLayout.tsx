import { ReactNode } from "react";

import ErrorText from "@components/pure/ErrorText";
import Loading from "@components/pure/Loading";

const UserModalLayout = ({
    title,
    children,
    errorMessage,
    isModalForNewUser,
    isModalForEditUser = false,
    isEdit,
    onUpdate,
    onEditToggle,
    isLoading,
}: {
    title: string;
    children: ReactNode;
    isModalForNewUser: boolean;
    isModalForEditUser?: boolean;
    isEdit?: boolean;
    errorMessage?: string;
    onUpdate?: () => void;
    onEditToggle?: () => void;
    isLoading?: boolean;
}) => {
    return (
        <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-center justify-between gap-2">
                <h2 className="text-3xl font-bold">{title}</h2>

                <div className="flex gap-3">
                    {isEdit && (
                        <button className={`btn btn-success`} onClick={onUpdate}>
                            Update
                        </button>
                    )}
                    {isModalForEditUser && (
                        <button className={`btn ${isEdit ? "btn-error" : "btn-success"}`} onClick={onEditToggle}>
                            {isEdit ? "Close Edit" : "Edit"}
                        </button>
                    )}

                    {isModalForNewUser && <button className="btn btn-success">Add user</button>}
                </div>
            </div>
            {isLoading ? (
                <Loading />
            ) : errorMessage ? (
                <ErrorText>{errorMessage}</ErrorText>
            ) : (
                <div className="flex flex-col gap-3">{children}</div>
            )}
        </div>
    );
};

export default UserModalLayout;
