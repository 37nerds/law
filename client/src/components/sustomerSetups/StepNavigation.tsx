import { Dispatch, SetStateAction } from "react";
import { customerSetupSteps } from "src/config/customerSetup";

type Props = {
    currentStepLabel: string;
    setCurrentStepLabel: Dispatch<SetStateAction<string>>;
};

<ul className="">
    <li>
        <a>Item 1</a>
    </li>
    <li>
        <a>Item 2</a>
    </li>
    <li>
        <a>Item 3</a>
    </li>
</ul>;

const StepNavigation = ({ currentStepLabel, setCurrentStepLabel }: Props) => {
    return (
        <div className="menu rounded-b-none rounded-box menu-vertical bg-base-100 lg:menu-horizontal">
            {customerSetupSteps.map(step => (
                <li
                    onClick={() => setCurrentStepLabel(step.label)}
                    className={`${
                        step.label == currentStepLabel
                            ? "active bg-base-200"
                            : "bg-base-200/50"
                    }`}
                >
                    <a>{step.label}</a>
                </li>
            ))}
        </div>
    );
};

export default StepNavigation;
