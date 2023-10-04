import CheckboxInput from "@components/inputs/CheckboxInput";

const FCheckBox = ({
    list,
    currentItemId,
    onChange,
}: {
    list: string[];
    currentItemId: string;
    onChange: (id: string) => void;
}) => {
    return (
        <CheckboxInput
            checked={!!list.find(s => s === currentItemId)}
            onChange={() => onChange(currentItemId)}
            className="checkbox-success"
        />
    );
};

export default FCheckBox;
