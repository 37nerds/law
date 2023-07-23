import useSetPageTitle from "@hooks/useSetPageTitle";
import { useState } from "react";
import {
    customersSetupSteps,
    getStepComponentByLabel,
} from "@steps/customerSetup";
import NavigatorCard from "@components/cards/NavigatorCard";

const CustomerSetup = () => {
    useSetPageTitle("Customer Setup");

    const [currentStepLabel, setCurrentStepLabel] =
        useState<string>("Group of Company");

    const component = getStepComponentByLabel(currentStepLabel);

    return (
        <NavigatorCard
            steps={customersSetupSteps}
            step={currentStepLabel}
            setStep={setCurrentStepLabel}
        >
            {component}
        </NavigatorCard>
    );
};

export default CustomerSetup;
