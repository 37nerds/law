const BottomButtons = ({
    buttons,
    onClick,
    loading = false,
}: {
    buttons: string[];
    onClick: (type: string) => void;
    loading?: boolean;
}) => {
    return (
        <div className="flex flex-col justify-between gap-2 lg:flex-row lg:px-20">
            {buttons.map((label, index) => (
                <button key={index} className="btn-sm btn lg:btn-md" onClick={() => onClick(label)} disabled={loading}>
                    {label}
                </button>
            ))}
        </div>
    );
};

export default BottomButtons;
