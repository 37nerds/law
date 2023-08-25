import Leads from "@screens/leads/index";
import useSetPageTitle from "@hooks/useSetPageTitle";

function InternalPage() {
    useSetPageTitle("Leads");

    return <Leads />;
}

export default InternalPage;
