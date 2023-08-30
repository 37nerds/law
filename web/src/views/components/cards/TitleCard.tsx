import {ReactNode} from "react";

import SubTitle from "../pure/SubTitle";

// will be removed

const TitleCard = ({
    title,
    children,
    topMargin,
    TopSideButtons,
}: {
    title: string;
    children: ReactNode;
    topMargin?: string;
    TopSideButtons?: ReactNode;
}) => {
    return (
        <div className={"card w-full bg-base-100 p-6 shadow-xl " + (topMargin || "mt-6")}>
            {/* Title for Card */}
            <SubTitle className={TopSideButtons ? "inline-block" : ""}>
                {title}

                {/* Top side button, show only if present */}
                {TopSideButtons && <div className="float-right inline-block">{TopSideButtons}</div>}
            </SubTitle>

            <div className="divider mt-2"></div>

            {/** Card Body */}
            <div className="h-full w-full bg-base-100 pb-6">{children}</div>
        </div>
    );
};

export default TitleCard;
