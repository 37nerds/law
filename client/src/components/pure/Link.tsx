import { Link as RRDLink } from "react-router-dom";
import { ReactNode } from "react";

const Link = ({ href, children }: { href: string; children: ReactNode }) => {
    return (
        <RRDLink to={href}>
            <span className="inline-block  transition duration-200 hover:cursor-pointer hover:text-primary hover:underline">
                {children}
            </span>
        </RRDLink>
    );
};

export default Link;
