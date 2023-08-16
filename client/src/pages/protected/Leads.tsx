import Leads from "@components/features/leads/index";
import useSetPageTitle from "@hooks/useSetPageTitle";

function InternalPage() {
    useSetPageTitle("Leads");

    return <Leads />;
}

export default InternalPage;
