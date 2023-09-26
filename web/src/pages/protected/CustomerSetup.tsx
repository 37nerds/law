import useSetPageTitle from "@hooks/useSetPageTitle";
import { customersSetupSteps, getStepComponentByLabel } from "../../screens/customerSetup";
import NavigatorCard from "../../components/cards/NavigatorCard";
import Loading from "../../components/pure/Loading";
import ErrorText from "../../components/pure/ErrorText";
import useCustomerSetupStore from "@states/customerSetupStore";
import { useEffect } from "react";
import { useFetchPopUpDataQuery } from "@fetches/customers/customers";
import { notify } from "@helpers/unknown";

const CustomerSetup = () => {
    useSetPageTitle("Customer Setup");

    const { activeStep, setActiveStep } = useCustomerSetupStore();

    const component = getStepComponentByLabel(activeStep);

    const fetchPopUpDataQuery = useFetchPopUpDataQuery();

    useEffect(() => {
        if (fetchPopUpDataQuery.isError) {
            notify("error", fetchPopUpDataQuery.error?.message);
        }
    }, [fetchPopUpDataQuery]);

    return (
        <>
            {fetchPopUpDataQuery.isLoading ? (
                <Loading />
            ) : fetchPopUpDataQuery.isError ? (
                <ErrorText>{fetchPopUpDataQuery.error?.message}</ErrorText>
            ) : (
                <NavigatorCard steps={customersSetupSteps} step={activeStep} setStep={setActiveStep}>
                    {component}
                </NavigatorCard>
            )}
        </>
    );
};

export default CustomerSetup;
