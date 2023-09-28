import { ReactNode } from "react";

import BottomButtons from "@screens/customer_setup/BottomButtons";
import Title from "@components/pure/Title";

const CustomerSetupStepLayout = ({
    children,
    title,
    buttons,
    onButtonClick,
    loading = false,
}: {
    children: ReactNode;
    title: string;
    buttons: string[];
    onButtonClick: (type: string) => void;
    loading?: boolean;
}) => {
    return (
        <div className="flex flex-col gap-10">
            <Title>{title}</Title>
            {children}
            <BottomButtons buttons={buttons} onClick={type => onButtonClick(type)} loading={loading} />
        </div>
    );
};

export default CustomerSetupStepLayout;
