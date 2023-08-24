import { ReactNode, useEffect, useState } from "react";
import { useMutation } from "react-query";

import { hitLogin } from "@external/auth";

import ErrorText from "@components/typographys/ErrorText";
import LandingIntro from "@components/LandingIntro";
import Link from "@components/pure/Link";
import StringInput from "@components/inputs/fields/StringInput";
import PasswordInput from "@components/inputs/fields/PasswordInput";
import { redirectAfterLoginRoute } from "@config/auth";

const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex min-h-screen items-center bg-base-200">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  grid-cols-1 rounded-xl  bg-base-100 md:grid-cols-2">
                    <div className="">
                        <LandingIntro />
                    </div>
                    <div className="px-10 py-24">
                        <h2 className="mb-2 text-center text-2xl font-semibold">Login</h2>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");

    const [emailOrUsernameErrorMessage, setEmailOrUsernameErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

    const loginMutation = useMutation({ mutationFn: hitLogin });

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
            window.location.href = redirectAfterLoginRoute;
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
        <Wrapper>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    submitForm();
                }}
            >
                <div className="mb-4 flex flex-col gap-4">
                    <StringInput
                        label="Email Address Or Username"
                        type="text"
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
        </Wrapper>
    );
};

export default Login;
