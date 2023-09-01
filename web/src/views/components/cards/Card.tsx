import { ReactNode } from "react";

import SubTitle from "../pure/SubTitle";

const Card = ({
    title,
    content,
    buttons,
    className,
}: {
    content: ReactNode;
    title?: string;
    buttons?: ReactNode;
    className?: string;
}) => {
    return (
        <div className={`card w-full rounded bg-base-100 p-6 shadow-xl ${className}`}>
            {(title || buttons) && (
                <>
                    <SubTitle className={buttons ? "inline-block" : ""}>
                        {title && title}
                        {buttons && <div className="float-right inline-block">{buttons}</div>}
                    </SubTitle>
                    <div className="divider mt-2"></div>
                </>
            )}
            <div className="h-full w-full bg-base-100 pb-6">{content}</div>
        </div>
    );
};

export default Card;
