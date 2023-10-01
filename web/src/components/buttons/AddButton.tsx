const AddButton = ({ label, onClick }: { label: string; onClick: () => void }) => {
    return (
        <button className="text btn btn-success rounded-md text-base-100" onClick={onClick}>
            Add new {label}
        </button>
    );
};

export default AddButton;
