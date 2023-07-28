import useSetPageTitle from "@hooks/useSetPageTitle";
import { useState } from "react";
import {
    customersSetupSteps,
    getStepComponentByLabel,
} from "@steps/customerSetup";
import NavigatorCard from "@components/cards/NavigatorCard";
import Loading from "@components/Loading";
import ErrorText from "@components/typographys/ErrorText";
import { useFetchPopUpDataQuery } from "@states/customers/customerApi";

const CustomerSetup = () => {
    useSetPageTitle("Customer Setup");

    const [currentStepLabel, setCurrentStepLabel] = useState<string>("Client");

    const component = getStepComponentByLabel(currentStepLabel);

    // @ts-ignore
    const { isLoading, error } = useFetchPopUpDataQuery();

    // noinspection UnnecessaryLocalVariableJS
    const errorX: any = error;
    const errorMessage = errorX?.data?.message;

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : errorMessage ? (
                <ErrorText>{errorMessage}</ErrorText>
            ) : (
                <NavigatorCard
                    steps={customersSetupSteps}
                    step={currentStepLabel}
                    setStep={setCurrentStepLabel}
                >
                    {component}
                </NavigatorCard>
            )}
        </>
    );
};

export default CustomerSetup;
