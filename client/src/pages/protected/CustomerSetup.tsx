import { useAppDispatch } from "@app/hooks";
import PageCard from "@components/cards/PageCard";
import InputText from "@components/inputs/InputText";
import TextAreaInput from "@components/inputs/TextAreaInput";
import ToggleInput from "@components/inputs/ToggleInput";
import StepNavigation from "@components/sustomerSetups/StepNavigation";
import { showNotification } from "@features/common/headerSlice";
import useSetPageTitle from "@hooks/useSetPageTitle";
import { useState } from "react";

const CustomerSetup = () => {
    const dispatch = useAppDispatch();

    const [currentStep, setCurrentStep] = useState("Group of Company Setup");

    useSetPageTitle("Customer Setup");

    // Call API to update profile settings changes
    const updateProfile = () => {
        dispatch(showNotification({ message: "Profile Updated", status: 1 }));
    };

    const updateFormValue = ({ updateType, value }: any) => {
        console.log(updateType);
    };

    return (
        <PageCard>
            <div className="rounded-md bg-[#242933]">
                <StepNavigation
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                />
                <div className="p-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Harum, nam earum dicta tenetur, quis praesentium eius
                    perferendis eos excepturi tempora cupiditate omnis officia,
                    nesciunt expedita minus blanditiis asperiores aliquid soluta
                    ex temporibus necessitatibus pariatur recusandae. Aliquam,
                    iste modi voluptate necessitatibus dolore earum numquam
                    praesentium, ipsam unde iusto ex, minus veritatis quod?
                    Placeat ducimus assumenda tempora voluptate quam obcaecati.
                    Commodi odit voluptatum veritatis placeat! Aliquid iste,
                    magni doloribus animi atque ad! Quos libero itaque fugiat
                    incidunt mollitia. Excepturi sequi blanditiis modi quia,
                    fugit ipsam amet? Reiciendis delectus veritatis autem
                    necessitatibus vitae, laudantium quia illo porro aut? Vel
                    repellat similique perferendis illo!
                </div>
            </div>
        </PageCard>
    );

    return (
        <PageCard>
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
        </PageCard>
    );
};

export default CustomerSetup;
