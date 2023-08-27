import { useEffect, useState } from "react";
import { useLoginMutation } from "@external/auth";
import { redirect_after_login } from "@config/auth";

import ErrorText from "@components/pure/ErrorText";
import Link from "@components/pure/Link";
import StringInput from "@components/inputs/StringInput";
import PasswordInput from "@components/inputs/PasswordInput";
import LoginWrapper from "@screens/login/LoginWrapper";
import { redirect } from "@helpers/location";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");

    const [emailOrUsernameErrorMessage, setEmailOrUsernameErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

    const loginMutation = useLoginMutation();

    const submitForm = () => {
        setLoading(true);
        setErrorMessage("");

        const trimmedEmailOrUsername = emailOrUsername.trim();
        const trimmedPassword = password.trim();

        if (!trimmedEmailOrUsername) {
            setEmailOrUsernameErrorMessage("Email or Username is required!");
        }
        if (!trimmedPassword) {
            setPasswordErrorMessage("Password is required!");
        }

        if (trimmedEmailOrUsername && trimmedPassword) {
            loginMutation.mutate({
                emailOrUsername: trimmedEmailOrUsername,
                password: trimmedPassword,
            });
        }
    };

    useEffect(() => {
        if (loginMutation.isSuccess) {
            redirect(redirect_after_login);
        }
        if (loginMutation.isError) {
            const errorPayload = loginMutation.error as any;
            setErrorMessage(errorPayload?.message);

            const errors = errorPayload?.errors;
            setEmailOrUsernameErrorMessage(errors["email"] || errors["username"]);
            setPasswordErrorMessage(errors["password"]);
        }
        if (loginMutation.isLoading) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [loginMutation]);

    return (
        <LoginWrapper>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    submitForm();
                }}
            >
                <div className="mb-4 flex flex-col gap-4">
                    <StringInput
                        label="Email Address Or Username"
                        type="email"
                        value={emailOrUsername}
                        setValue={value => {
                            setEmailOrUsername(value);
                        }}
                        required={true}
                        errorMessage={emailOrUsernameErrorMessage}
                    />

                    <PasswordInput
                        label="Password"
                        value={password}
                        setValue={setPassword}
                        required={true}
                        errorMessage={passwordErrorMessage}
                    />
                </div>

                <div className="text-right text-primary">
                    <Link href={"/forgot-password"}>Forgot Password?</Link>
                </div>

                <ErrorText className="mt-8">{errorMessage}</ErrorText>
                <button type="submit" className={"btn-primary btn mt-2 w-full" + (loading ? " loading" : "")}>
                    Login
                </button>

                <div className="mt-4 text-center">
                    Don't have an account yet? <Link href="/register">Register</Link>
                </div>
            </form>
        </LoginWrapper>
    );
};

export default Login;
