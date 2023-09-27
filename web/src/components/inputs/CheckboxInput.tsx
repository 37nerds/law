const CheckboxInput = ({
    checked,
    onChange,
    disabled = false,
}: {
    checked: boolean;
    onChange: () => void;
    disabled?: boolean;
}) => {
    return <input type="checkbox" checked={checked} className="checkbox" onChange={onChange} disabled={disabled} />;
};

export default CheckboxInput;
