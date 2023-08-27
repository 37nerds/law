import { useEffect, useState } from "react";
import { useResetPasswordMutation } from "@external/auth";
import { redirect } from "@helpers/location";

import ErrorText from "@components/pure/ErrorText";
import Link from "@components/pure/Link";
import PasswordInput from "@components/inputs/PasswordInput";
import ResetPasswordWrapper from "@screens/resetPassword/ResetPasswordWrapper";
import useQueryParams from "@hooks/useQueryParams";

const ResetPassword = () => {
    const params = useQueryParams();

    const token = params.get("token");
    const email = params.get("email");

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

    const resetPasswordMutation = useResetPasswordMutation();

    const submitForm = () => {
        setLoading(true);
        setErrorMessage("");

        if (!token) {
            setLoading(false);
            return setErrorMessage("There is no token!");
        }

        if (!email) {
            setLoading(false);
            return setErrorMessage("There is no email!");
        }

        const trimmedPassword = password.trim();
        const trimmedConfirmPassword = confirmPassword.trim();

        if (!trimmedPassword) {
            setPasswordErrorMessage("Password is required!");
        }
        if (!trimmedConfirmPassword) {
            setConfirmPasswordErrorMessage("Confirm is required!");
        }

        if (trimmedPassword !== trimmedConfirmPassword) {
            setPasswordErrorMessage("Password not matching with confirm password");
            setConfirmPasswordErrorMessage("Password not matching with confirm password");

            setLoading(false);
            return;
        }

        resetPasswordMutation.mutate({
            token: token,
            email: email,
            password: trimmedPassword,
            password_confirmation: trimmedConfirmPassword,
        });
    };

    useEffect(() => {
        if (resetPasswordMutation.isLoading) {
            setLoading(true);
        } else {
            setLoading(false);
        }

        if (resetPasswordMutation.isError) {
            setLoading(false);
            setErrorMessage(resetPasswordMutation.error?.message || "");
        }

        if (resetPasswordMutation.isSuccess) {
            redirect("/login");
        }
    }, [resetPasswordMutation]);

    return (
        <ResetPasswordWrapper>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    submitForm();
                }}
            >
                <div className="mb-4 flex flex-col gap-4">
                    <PasswordInput
                        label="Password"
                        value={password}
                        setValue={setPassword}
                        required={true}
                        errorMessage={passwordErrorMessage}
                    />
                    <PasswordInput
                        label="Password"
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        required={true}
                        errorMessage={confirmPasswordErrorMessage}
                    />
                </div>

                <ErrorText className="mt-8">{errorMessage}</ErrorText>
                <button type="submit" className={"btn-primary btn mt-2 w-full" + (loading ? " loading" : "")}>
                    Save
                </button>

                <div className="mt-4 text-center">
                    Or ? <Link href="/login">Login</Link>
                </div>
            </form>
        </ResetPasswordWrapper>
    );
};

export default ResetPassword;
