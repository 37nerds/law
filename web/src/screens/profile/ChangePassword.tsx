import { useEffect, useState } from "react";
import { useUpdatePasswordMutation } from "@fetches/auth/auth";

import SubTitle from "@components/pure/SubTitle";
import PasswordInput from "@components/inputs/PasswordInput";
import Form from "@components/pure/Form";

const ChangePassword = () => {
    const updatePasswordMutation = useUpdatePasswordMutation();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [currentPasswordErrorMessage, setCurrentPasswordErrorMessage] = useState("");
    const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");

    const handleSubmit = () => {
        setCurrentPasswordErrorMessage("");
        setNewPasswordErrorMessage("");
        setConfirmPasswordErrorMessage("");

        const trimmedCurrentPassword = currentPassword.trim();
        const trimmedNewPassword = newPassword.trim();
        const trimmedConfirmPassword = confirmPassword.trim();

        if (!trimmedCurrentPassword) {
            setCurrentPasswordErrorMessage("Current password is required!");
        }

        if (!trimmedNewPassword) {
            setNewPasswordErrorMessage("New password is required!");
        }

        if (trimmedNewPassword !== trimmedConfirmPassword || trimmedCurrentPassword === "") {
            setConfirmPasswordErrorMessage("Password not matching");
            return;
        }

        if (!trimmedNewPassword || !trimmedNewPassword) {
            return;
        }

        updatePasswordMutation.mutate({
            current_password: trimmedCurrentPassword,
            new_password: trimmedNewPassword,
        });
    };

    useEffect(() => {
        if (updatePasswordMutation.isError) {
            setCurrentPasswordErrorMessage(updatePasswordMutation?.error?.errors?.current_password?.at(0) || "");
            setNewPasswordErrorMessage(updatePasswordMutation?.error?.errors?.new_password?.at(0) || "");
        }

        if (updatePasswordMutation.isSuccess) {
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
    }, [updatePasswordMutation.isError, updatePasswordMutation.isSuccess]);

    return (
        <Form onSubmit={handleSubmit} loading={updatePasswordMutation.isLoading} className="flex flex-col gap-2">
            <SubTitle divider={true}>Change Password</SubTitle>
            <PasswordInput
                label="Current Password"
                value={currentPassword}
                setValue={setCurrentPassword}
                errorMessage={currentPasswordErrorMessage}
            />
            <PasswordInput
                label="New Password"
                value={newPassword}
                setValue={setNewPassword}
                errorMessage={newPasswordErrorMessage}
            />
            <PasswordInput
                label="New Password Again"
                value={confirmPassword}
                setValue={setConfirmPassword}
                errorMessage={confirmPasswordErrorMessage}
            />
        </Form>
    );
};

export default ChangePassword;
