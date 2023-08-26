import { useAppDispatch } from "@app/hooks";
import InputText, { TUpdateFormValue } from "@components/inputs/internal/old/InputText";
import ErrorText from "@components/pure/ErrorText";
import { useState } from "react";
import { addNewLead, TLeadObj } from "../leadSlice";
import notify from "@helpers/unkown";

const INITIAL_LEAD_OBJ = {
    first_name: "",
    last_name: "",
    email: "",
};

type Props = {
    closeModal: () => void;
};

function AddLeadModalBody({ closeModal }: Props) {
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState("");
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

    const saveNewLead = () => {
        if (leadObj.first_name.trim() === "") return setErrorMessage("First Name is required!");
        else if (leadObj.email.trim() === "") return setErrorMessage("Email id is required!");
        else {
            let newLeadObj: TLeadObj = {
                id: 7,
                email: leadObj.email,
                first_name: leadObj.first_name,
                last_name: leadObj.last_name,
                avatar: "https://reqres.in/img/faces/1-image.jpg",
            };
            dispatch(addNewLead({ newLeadObj }));
            notify("success", "New Lead Added!");
            closeModal();
        }
    };

    const updateFormValue: TUpdateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setLeadObj({ ...leadObj, [updateType ?? ""]: value });
    };

    return (
        <>
            <InputText
                type="text"
                defaultValue={leadObj.first_name}
                updateType="first_name"
                containerStyle="mt-4"
                labelTitle="First Name"
                updateFormValue={updateFormValue}
            />

            <InputText
                type="text"
                defaultValue={leadObj.last_name}
                updateType="last_name"
                containerStyle="mt-4"
                labelTitle="Last Name"
                updateFormValue={updateFormValue}
            />

            <InputText
                type="email"
                defaultValue={leadObj.email}
                updateType="email"
                containerStyle="mt-4"
                labelTitle="Email Id"
                updateFormValue={updateFormValue}
            />

            <ErrorText className="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn-ghost btn" onClick={() => closeModal()}>
                    Cancel
                </button>
                <button className="btn-primary btn px-6" onClick={() => saveNewLead()}>
                    Save
                </button>
            </div>
        </>
    );
}

export default AddLeadModalBody;
