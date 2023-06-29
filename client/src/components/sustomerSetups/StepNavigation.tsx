import { Dispatch, SetStateAction } from "react";

const steps = [
    "Group of Company Setup",
    "Company Setup",
    "Unit Setup",
    "Client Setup",
];

const StepNavigation = ({
    currentStep,
    setCurrentStep,
}: {
    currentStep: string;
    setCurrentStep: Dispatch<SetStateAction<string>>;
}) => {
    return (
        <div className="tabs">
            {steps.map(step => (
                <a
                    onClick={() => setCurrentStep(step)}
                    className={`tab-lifted tab ${
                        step == currentStep ? "tab-active " : ""
                    }`}
                >
                    {step}
                </a>
            ))}
        </div>
    );
};

export default StepNavigation;
