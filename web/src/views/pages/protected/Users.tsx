import useSetPageTitle from "@hooks/useSetPageTitle";
import Users from "@screens/users";

function InternalPage() {
    useSetPageTitle("Users");

    return <Users />;
}

export default InternalPage;
