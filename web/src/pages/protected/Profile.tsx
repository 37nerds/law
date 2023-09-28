import useSetPageTitle from "@hooks/useSetPageTitle";

import ProfilePicture from "@screens/profile/ProfilePicture";
import Details from "@screens/profile/Details";
import ChangePassword from "@screens/profile/ChangePassword";
import PageCard from "@components/cards/PageCard";

const Profile = () => {
    useSetPageTitle("Profile");

    return (
        <PageCard className="mx-auto max-w-5xl lg:mt-16">
            <div className="mt-5 flex flex-row gap-2">
                <div className="flex w-[65%] flex-col gap-10 pl-5 pr-10">
                    <Details />
                    <ChangePassword />
                </div>
                <div className="flex w-[35%] flex-col items-center gap-2">
                    <ProfilePicture />
                </div>
            </div>
        </PageCard>
    );
};

export default Profile;
