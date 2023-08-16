import useSetPageTitle from "@hooks/useSetPageTitle";
import {
    customersSetupSteps,
    getStepComponentByLabel,
} from "@screens/customerSetup";
import NavigatorCard from "@components/cards/NavigatorCard";
import Loading from "@components/Loading";
import ErrorText from "@components/typographys/ErrorText";
import useCustomerSetupStore from "@states/useCustomerSetupStore";
import useFetchCustomerPopUpData from "@hooks/useFetchCustomerPopUpData";

const CustomerSetup = () => {
    useSetPageTitle("Customer Setup");

    const { activeStep, setActiveStep } = useCustomerSetupStore();

    const component = getStepComponentByLabel(activeStep);

    const fetchPopUpDataQuery = useFetchCustomerPopUpData();

    return (
        <>
            {fetchPopUpDataQuery.isLoading ? (
                <Loading />
            ) : fetchPopUpDataQuery.isError ? (
                <ErrorText>{fetchPopUpDataQuery.error as string}</ErrorText>
            ) : (
                <NavigatorCard
                    steps={customersSetupSteps}
                    step={activeStep}
                    setStep={setActiveStep}
                >
                    {component}
                </NavigatorCard>
            )}
        </>
    );
};

export default CustomerSetup;
