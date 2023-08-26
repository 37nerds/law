import Billing from "@screens/settings/billing";
import useSetPageTitle from "@hooks/useSetPageTitle";

const InternalPage = () => {
    useSetPageTitle("Bills");

    return <Billing />;
};

export default InternalPage;
