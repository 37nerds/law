import { ReactNode, useEffect, useState } from "react";
import { useMutation } from "react-query";

import { hitRegister } from "@external/auth";

import ErrorText from "@components/typographys/ErrorText";
import LandingIntro from "@components/LandingIntro";
import StringInput from "@components/inputs/fields/StringInput";
import PasswordInput from "@components/inputs/fields/PasswordInput";
import Link from "@components/pure/Link";
import { redirectAfterLoginRoute } from "@config/auth";

const getUsernameFromEmail = (email: string) => {
    return email.split("@")[0];
};

const getNameFromEmail = (email: string) => {
    const name = getUsernameFromEmail(email);
    return name[0].toUpperCase() + name.slice(1);
};

const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex min-h-screen items-center bg-base-200">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  grid-cols-1 rounded-xl  bg-base-100 md:grid-cols-2">
                    <div className="">
                        <LandingIntro />
                    </div>
                    <div className="px-10 py-24">
                        <h2 className="mb-2 text-center text-2xl font-semibold">Register</h2>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
    const [nameErrorMessage, setNameErrorMessage] = useState("");
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");

    const registerMutation = useMutation({ mutationFn: hitRegister });

    const handleSubmit = () => {
        setLoading(true);
        setErrorMessage("");

        const trimmedName = name.trim();
        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        const trimmedConfirmPassword = confirmPassword.trim();

        if (!trimmedUsername) {
            setUsernameErrorMessage("Username is required!");
        }
        if (!trimmedEmail) {
            setEmailErrorMessage("Email is required!");
        }
        if (!trimmedPassword) {
            setPasswordErrorMessage("Password is required!");
        }
        if (trimmedPassword !== trimmedConfirmPassword) {
            setConfirmPasswordErrorMessage("Password and Confirm Password do not match.");
        }

        if (trimmedUsername && trimmedEmail && trimmedPassword && trimmedPassword === trimmedConfirmPassword) {
            registerMutation.mutate({
                name: trimmedName,
                username: trimmedUsername,
                email: trimmedEmail,
                password: trimmedPassword,
            });
        }
    };

    useEffect(() => {
        if (registerMutation.isSuccess) {
            window.location.href = redirectAfterLoginRoute;
        }
        if (registerMutation.isError) {
            const errorPayload = registerMutation.error as any;

            setErrorMessage(errorPayload?.message);

            const errors = errorPayload?.errors;

            setUsernameErrorMessage(errors["username"]);
            setNameErrorMessage(errors["name"]);
            setEmailErrorMessage(errors["email"]);
            setPasswordErrorMessage(errors["password"]);
            setConfirmPasswordErrorMessage(errors["password"]);
        }
        if (registerMutation.isLoading) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [registerMutation]);

    return (
        <Wrapper>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <div className="mb-4 flex flex-col gap-4">
                    <StringInput
                        label="Email Address"
                        type="email"
                        value={email}
                        setValue={value => {
                            setEmail(value);
                            setUsername(getUsernameFromEmail(value));
                            setName(getNameFromEmail(value));
                        }}
                        required={true}
                        errorMessage={emailErrorMessage}
                    />
                    <StringInput
                        label="Username"
                        value={username}
                        setValue={setUsername}
                        required={true}
                        errorMessage={usernameErrorMessage}
                    />
                    <StringInput
                        label="Name"
                        value={name}
                        setValue={value => setName(value)}
                        errorMessage={nameErrorMessage}
                    />

                    <PasswordInput
                        label="Password"
                        value={password}
                        setValue={setPassword}
                        required={true}
                        errorMessage={passwordErrorMessage}
                    />
                    <PasswordInput
                        label="Password Again"
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        required={true}
                        errorMessage={confirmPasswordErrorMessage}
                    />
                </div>

                <ErrorText className="mt-8">{errorMessage}</ErrorText>
                <button type="submit" className={"btn-primary btn mt-2 w-full" + (loading ? " loading" : "")}>
                    Register
                </button>

                <div className="mt-4 text-center">
                    Already have an account? <Link href="/guest/Login">Login</Link>
                </div>
            </form>
        </Wrapper>
    );
};

export default Register;
