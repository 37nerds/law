import { Dispatch, SetStateAction } from "react";
import { TNavigatorStep } from "../steps/customerSetup";

const StepNavigator = ({
    currentStepLabel,
    setCurrentStepLabel,
    steps,
}: {
    currentStepLabel: string;
    setCurrentStepLabel: Dispatch<SetStateAction<string>>;
    steps: TNavigatorStep[];
}) => {
    return (
        <div className="rounded-t-box flex flex-col gap-1 overflow-hidden lg:flex-row">
            {steps.map((step, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentStepLabel(step.label)}
                    className={`w-full py-3 pl-6 text-start text-lg ${
                        step.label == currentStepLabel
                            ? "bg-base-300 font-bold"
                            : "bg-base-100 font-semibold"
                    }`}
                >
                    <a>{step.label}</a>
                </button>
            ))}
        </div>
    );
};

export default StepNavigator;
