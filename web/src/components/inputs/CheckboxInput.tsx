const CheckboxInput = ({
    checked,
    onChange,
    disabled = false,
    className = "",
}: {
    checked: boolean;
    onChange: () => void;
    disabled?: boolean;
    className?: string;
}) => {
    return (
        <input
            type="checkbox"
            checked={checked}
            className={`checkbox ${className}`}
            onChange={onChange}
            disabled={disabled}
        />
    );
};

export default CheckboxInput;
