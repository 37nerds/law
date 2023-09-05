import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const DeleteConfirmmer = ({
    onClose,
    onDelete,
    onCancel,
}: {
    onClose: () => void;
    onDelete?: () => void;
    onCancel?: () => void;
}) => {
    return (
        <div className="alert top-0 shadow-lg">
            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="h-6 w-6 flex-shrink-0 stroke-info"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                </svg>
                <span>Are you sure?</span>
            </div>
            <div className="flex-none">
                <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                        onCancel && onCancel();
                        onClose();
                    }}
                >
                    Cancel
                </button>
                <button
                    className="btn btn-error btn-sm"
                    onClick={() => {
                        onDelete && onDelete();
                        onClose();
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

const confirmDelete = ({ onDelete, onCancel }: { onDelete: () => void; onCancel: () => void }) => {
    confirmAlert({
        overlayClassName: "bg-red-500",
        customUI: ({ onClose }) => {
            return <DeleteConfirmmer onClose={onClose} onDelete={onDelete} onCancel={onCancel} />;
        },
    });
};

export default confirmDelete;
