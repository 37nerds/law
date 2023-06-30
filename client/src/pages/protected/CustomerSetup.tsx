import { useAppDispatch } from "@app/hooks";
import PageCard from "@components/cards/PageCard";
import InputText from "@components/inputs/InputText";
import TextAreaInput from "@components/inputs/TextAreaInput";
import ToggleInput from "@components/inputs/ToggleInput";
import StepNavigation from "@components/sustomerSetups/StepNavigation";
import { showNotification } from "@features/common/headerSlice";
import useSetPageTitle from "@hooks/useSetPageTitle";
import { useState } from "react";
import { customerSetupSteps } from "src/config/customerSetup";

const CustomerSetup = () => {
    const dispatch = useAppDispatch();

    const [currentStepLabel, setCurrentStepLabel] =
        useState("Group of Company");

    useSetPageTitle("Customer Setup");

    // Call API to update profile settings changes
    const updateProfile = () => {
        dispatch(showNotification({ message: "Profile Updated", status: 1 }));
    };

    const updateFormValue = ({ updateType, value }: any) => {
        console.log(updateType);
    };

    const currentStep = customerSetupSteps.find(
        c => c.label == currentStepLabel
    );

    const StepComponent = currentStep ? currentStep.component : () => <></>;

    return (
        <PageCard>
            <StepNavigation
                currentStepLabel={currentStepLabel}
                setCurrentStepLabel={setCurrentStepLabel}
            />
            <div className="p-4 bg-base-200">{<StepComponent />}</div>
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
