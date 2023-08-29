import { notify } from "@helpers/unkown";

import useSetPageTitle from "@hooks/useSetPageTitle";
import Card from "@components/cards/Card";
import StringInput from "@components/inputs/StringInput";
import TextInput from "@components/inputs/TextInput";
import ProfilePicture from "@screens/profile/ProfilePicture";

const Profile = () => {
    useSetPageTitle("Profile");

    const handleChange = (field: string, value: any) => {
        // log.print(field, value);
    };

    const handleUpdate = () => {
        notify("success", "profile Updated");
    };

    return (
        <Card
            className="mx-auto max-w-5xl lg:mt-16"
            content={
                <>
                    <div className="mt-5 flex flex-row gap-2">
                        <div className="flex w-[65%] flex-col gap-2 pl-5 pr-10">
                            <StringInput label="Name" value={""} setValue={value => handleChange("name", value)} />
                            <StringInput label="Email" value={""} setValue={value => handleChange("email", value)} />
                            <TextInput label="About" value={""} setValue={value => handleChange("about", value)} />
                            <div className="mt-16">
                                <button className="btn-primary btn" onClick={() => handleUpdate()}>
                                    Update
                                </button>
                            </div>
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
