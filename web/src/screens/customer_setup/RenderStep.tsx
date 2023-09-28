import type { ReactNode } from "react";
import type { TBottomButton } from "@helpers/types";

import Loading from "@components/pure/Loading";
import CustomerSetupStepLayout from "@screens/customer_setup/CustomerSetupStepLayout";

const RenderStep = ({
    children,
    bottomButtons,
    title,
    loading = false,
}: {
    children: ReactNode;
    bottomButtons: TBottomButton[];
    title: string;
    loading?: boolean;
}) => {
    const handleButtonClick = (type: string) => {
        const buttonButton = bottomButtons.find(b => b.type === type);
        if (!buttonButton || !buttonButton.handler) return;
        buttonButton.handler();
    };

    return (
        <CustomerSetupStepLayout
            title={title}
            buttons={bottomButtons.map(b => b.type)}
            onButtonClick={handleButtonClick}
            loading={loading}
        >
            {loading ? <Loading /> : <>{children}</>}
        </CustomerSetupStepLayout>
    );
};

export default RenderStep;
