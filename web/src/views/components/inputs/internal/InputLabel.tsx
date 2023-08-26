const InputLabel = ({ label }: { label: string }) => {
    return (
        <label className="label">
            <span className="label-text">{label}</span>
        </label>
    );
};

export default InputLabel;
