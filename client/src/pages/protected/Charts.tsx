import Charts from "@components/features/charts/index";
import useSetPageTitle from "@hooks/useSetPageTitle";

function InternalPage() {
    useSetPageTitle("Charts");

    return <Charts />;
}

export default InternalPage;
