const InputLabel = ({ label }: { label: string }) => {
    return (
        <label className="label">
            <span className={"text-layouts-Content label-text "}>{label}</span>
        </label>
    );
};

export default InputLabel;
