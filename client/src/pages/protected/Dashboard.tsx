import Dashboard from "@components/features/dashboard/index";
import useSetPageTitle from "@hooks/useSetPageTitle";

function InternalPage() {
    useSetPageTitle("Dashboard");

    return <Dashboard />;
}

export default InternalPage;
