import { ReactNode } from "react";

import Loading from "@components/pure/Loading";
import ErrorText from "@components/pure/ErrorText";

const CustomerModalLayout = ({
    title,
    children,
    errorMessage,
    isEdit,
    onUpdate,
    onEditToggle,
    isLoading,
}: {
    title: string;
    children: ReactNode;
    errorMessage: string;
    isEdit: boolean;
    onUpdate: () => void;
    onEditToggle: () => void;
    isLoading: boolean;
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
                    <button className={`btn ${isEdit ? "btn-error" : "btn-success"}`} onClick={onEditToggle}>
                        {isEdit ? "Close Edit" : "Edit"}
                    </button>
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

export default CustomerModalLayout;
