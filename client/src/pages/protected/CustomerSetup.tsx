import useSetPageTitle from "@hooks/useSetPageTitle";
import { useEffect, useState } from "react";
import {
    customersSetupSteps,
    getStepComponentByLabel,
} from "@steps/customerSetup";
import NavigatorCard from "@components/cards/NavigatorCard";
import useFetchRequest from "@hooks/http/useFetchRequest";
import Loading from "@components/Loading";
import ErrorText from "@components/typographys/ErrorText";
import { setPopUpData } from "@states/customers/customerSlice";
import { selectCustomers } from "@states/customers/customerSelector";

const CustomerSetup = () => {
    useSetPageTitle("Customer Setup");

    const [currentStepLabel, setCurrentStepLabel] =
        useState<string>("Group of Company");

    const component = getStepComponentByLabel(currentStepLabel);

    const { loading, errorMessage, setRefetch } = useFetchRequest(
        "/customers/pop-up-data",
        setPopUpData
    );

    const refetchPopUpData = selectCustomers().refetchPopUpData;

    useEffect(() => {
        setRefetch(x => !x);
    }, [refetchPopUpData]);

    return (
        <>
            {loading ? (
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
