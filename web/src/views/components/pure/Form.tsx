import { ReactNode } from "react";

const Form = ({
    onSubmit,
    children,
    loading = false,
    className = "",
    buttonContent = "Update",
    buttonClassName = "",
}: {
    children: ReactNode;
    onSubmit: any;
    loading?: boolean;
    className?: string;
    buttonContent?: string;
    buttonClassName?: string;
}) => {
    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                onSubmit();
            }}
            className={className}
        >
            {children}

            <div>
                <button type="submit" className={`btn ${loading ? "loading" : ""} ${buttonClassName}`}>
                    {buttonContent}
                </button>
            </div>
        </form>
    );
};

export default Form;
