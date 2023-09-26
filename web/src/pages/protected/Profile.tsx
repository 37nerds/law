import useSetPageTitle from "@hooks/useSetPageTitle";
import Card from "../../components/cards/Card";
import ProfilePicture from "../../screens/profile/ProfilePicture";
import Details from "../../screens/profile/Details";
import ChangePassword from "../../screens/profile/ChangePassword";

const Profile = () => {
    useSetPageTitle("Profile");

    return (
        <Card
            className="mx-auto max-w-5xl lg:mt-16"
            content={
                <>
                    <div className="mt-5 flex flex-row gap-2">
                        <div className="flex w-[65%] flex-col gap-10 pl-5 pr-10">
                            <Details />
                            <ChangePassword />
                        </div>
                        <div className="flex w-[35%] flex-col items-center gap-2">
                            <ProfilePicture />
                        </div>
                    </div>
                </>
            }
        />
    );
};

export default Profile;
