import Team from "@screens/settings/team";
import useSetPageTitle from "@hooks/useSetPageTitle";

function InternalPage() {
    useSetPageTitle("Team Members");

    return <Team />;
}

export default InternalPage;
