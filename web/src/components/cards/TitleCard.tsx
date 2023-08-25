import Subtitle from "@components/typographys/Subtitle";
import { ReactNode } from "react";

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
        <div
            className={
                "card w-full bg-base-100 p-6 shadow-xl " + (topMargin || "mt-6")
            }
        >
            {/* Title for Card */}
            <Subtitle styleClass={TopSideButtons ? "inline-block" : ""}>
                {title}

                {/* Top side button, show only if present */}
                {TopSideButtons && (
                    <div className="float-right inline-block">
                        {TopSideButtons}
                    </div>
                )}
            </Subtitle>

            <div className="divider mt-2"></div>

            {/** Card Body */}
            <div className="h-full w-full bg-base-100 pb-6">{children}</div>
        </div>
    );
};

export default TitleCard;
