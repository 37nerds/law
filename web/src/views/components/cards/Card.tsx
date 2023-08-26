import { ReactNode } from "react";

import Subtitle from "../pure/Subtitle";

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
        <div className={`card w-full bg-base-100 p-6 shadow-xl ${className}`}>
            {(title || buttons) && (
                <>
                    <Subtitle className={buttons ? "inline-block" : ""}>
                        {title && title}
                        {buttons && <div className="float-right inline-block">{buttons}</div>}
                    </Subtitle>
                    <div className="divider mt-2"></div>
                </>
            )}
            <div className="h-full w-full bg-base-100 pb-6">{content}</div>
        </div>
    );
};

export default Card;
