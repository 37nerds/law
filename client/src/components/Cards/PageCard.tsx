import Subtitle from "@components/typographys/Subtitle";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    topMargin?: string;
    TopSideButtons?: ReactNode;
};

const PageCard = ({ children, topMargin, TopSideButtons }: Props) => {
    return (
        <div
            className={
                "card w-full bg-base-100 p-6 shadow-xl " + (topMargin || "mt-[1px]")
            }
        >
            <Subtitle styleClass={TopSideButtons ? "inline-block" : ""}>
                {/* Top side button, show only if present */}
                {TopSideButtons && (
                    <div className="float-right inline-block">
                        {TopSideButtons}
                    </div>
                )}
            </Subtitle>
            <div className="h-full w-full bg-base-100 pb-6">{children}</div>
        </div>
    );
};

export default PageCard;
