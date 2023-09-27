import { Dispatch, ReactNode, SetStateAction } from "react";
import { TNavigatorStep } from "src/screens/customer_setup";

import StepNavigator from "./StepNavigator";

const NavigatorCard = ({
    children,
    step,
    setStep,
    steps,
}: {
    children: ReactNode;
    step: string;
    setStep: Dispatch<SetStateAction<any>>;
    steps: TNavigatorStep[];
}) => {
    return (
        <div className="card rounded-box rounded-t-box m-auto w-full max-w-7xl bg-base-300 text-sm shadow-xl">
            <StepNavigator currentStepLabel={step} setCurrentStepLabel={setStep} steps={steps} />
            <div className="p-6">{children}</div>
        </div>
    );
};

export default NavigatorCard;
