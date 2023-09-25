import { ReactNode } from "react";

const PageLayout = ({ children }: { children: ReactNode }) => {
    return <div className="card flex w-full flex-col gap-3 rounded bg-base-100 p-6 shadow-md">{children}</div>;
};

export default PageLayout;
