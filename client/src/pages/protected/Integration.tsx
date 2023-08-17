import Integration from "src/screens/integration";
import useSetPageTitle from "@hooks/useSetPageTitle";

function InternalPage() {
    useSetPageTitle("Integrations");

    return <Integration />;
}

export default InternalPage;
