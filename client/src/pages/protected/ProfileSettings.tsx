import ProfileSettings from "@components/features/settings/profilesettings";
import useSetPageTitle from "@hooks/useSetPageTitle";

function InternalPage() {
    useSetPageTitle("Settings");

    return <ProfileSettings />;
}

export default InternalPage;
