import { ReactElement } from "react";

type Props = {
    label: string;
    element: ReactElement;
};

const SingleInputBox = ({ label, element }: Props) => {
    return (
        <div className="flex w-full items-center">
            <div className="w-1/5">{label}</div>
            <div className="w-4/5">{element}</div>
        </div>
    );
};

export default SingleInputBox;
