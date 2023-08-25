const InputLabel = ({ label }: { label: string }) => {
    return (
        <label className="label">
            <span className={"text-layouts-content label-text "}>{label}</span>
        </label>
    );
};

export default InputLabel;
