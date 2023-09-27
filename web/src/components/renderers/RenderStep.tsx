import type { ReactNode } from "react";
import type { TBottomButton } from "@helpers/types";

import Loading from "../pure/Loading";
import CustomerSetupStepLayout from "../layouts/CustomerSetupStepLayout";

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
