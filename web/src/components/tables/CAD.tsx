import IsPermitted from "@components/auth/IsPermitted";
import CheckboxInput from "@components/inputs/CheckboxInput";

const CAD = ({
    onSelect,
    onDeselect,
    checked,
    length,
    api,
    onClick,
    disabled = false,
}: {
    onSelect: () => void;
    onDeselect: () => void;
    checked: boolean;
    length: number;
    api: string;
    onClick: () => void;
    disabled?: boolean;
}) => {
    return (
        <>
            <CheckboxInput
                checked={checked}
                onChange={() => {
                    if (checked) {
                        onDeselect();
                    } else {
                        onSelect();
                    }
                }}
                className="checkbox-success"
            />
            {length > 0 && (
                <IsPermitted
                    api={api}
                    method="delete"
                    element={
                        <button
                            disabled={disabled}
                            onClick={onClick}
                            type="button"
                            className="btn btn-error text-white"
                        >
                            Delete Selected Items
                        </button>
                    }
                />
            )}
        </>
    );
};

export default CAD;
