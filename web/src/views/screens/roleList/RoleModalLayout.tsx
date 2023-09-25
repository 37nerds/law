import { ReactNode } from "react";

import ErrorText from "@components/pure/ErrorText";
import Loading from "@components/pure/Loading";

const RoleModalLayout = ({
    title,
    children,
    errorMessage,
    isModalForNewRole,
    isModalForEditRole = false,
    isEdit,
    onUpdate,
    onEditToggle,
    isLoading,
}: {
    title: string;
    children: ReactNode;
    isModalForNewRole: boolean;
    isModalForEditRole?: boolean;
    isEdit?: boolean;
    errorMessage?: string;
    onUpdate?: () => void;
    onEditToggle?: () => void;
    isLoading?: boolean;
}) => {
    // add new user handler
    const handleNewUserCreation = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

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
                    {isModalForEditRole && (
                        <button className={`btn ${isEdit ? "btn-error" : "btn-success"}`} onClick={onEditToggle}>
                            {isEdit ? "Close Edit" : "Edit"}
                        </button>
                    )}

                    {isModalForNewRole && (
                        <button className="btn btn-success" onClick={handleNewUserCreation}>
                            Add Role
                        </button>
                    )}
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

export default RoleModalLayout;
