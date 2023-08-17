import TitleCard from "@components/cards/TitleCard";
import InputText from "@components/inputs/old/InputText";
import TextAreaInput from "@components/inputs/old/TextAreaInput";
import ToggleInput from "@components/inputs/old/ToggleInput";
import Log from "@helpers/Log";
import notify from "@helpers/notify";

const ProfileSettings = () => {
    // Call API to update profile settings changes
    const updateProfile = () => {
        notify("success", "Profile Updated");
    };

    const updateFormValue = ({ updateType, value }: any) => {
        Log.print(updateType, value);
    };

    return (
        <>
            <TitleCard title="Profile Settings" topMargin="mt-2">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <InputText
                        labelTitle="Name"
                        defaultValue="Alex"
                        updateFormValue={updateFormValue}
                    />
                    <InputText
                        labelTitle="Email Id"
                        defaultValue="alex@dashwind.com"
                        updateFormValue={updateFormValue}
                    />
                    <InputText
                        labelTitle="Title"
                        defaultValue="UI/UX Designer"
                        updateFormValue={updateFormValue}
                    />
                    <InputText
                        labelTitle="Place"
                        defaultValue="California"
                        updateFormValue={updateFormValue}
                    />
                    <TextAreaInput
                        labelTitle="About"
                        defaultValue="Doing what I love, part time traveler"
                        updateFormValue={updateFormValue}
                    />
                </div>
                <div className="divider"></div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <InputText
                        labelTitle="Language"
                        defaultValue="English"
                        updateFormValue={updateFormValue}
                    />
                    <InputText
                        labelTitle="Timezone"
                        defaultValue="IST"
                        updateFormValue={updateFormValue}
                    />
                    <ToggleInput
                        updateType="syncData"
                        labelTitle="Sync Data"
                        defaultValue={true}
                        updateFormValue={updateFormValue}
                    />
                </div>

                <div className="mt-16">
                    <button
                        className="btn-primary btn float-right"
                        onClick={() => updateProfile()}
                    >
                        Update
                    </button>
                </div>
            </TitleCard>
        </>
    );
};

export default ProfileSettings;
