import { ReactNode, useEffect, useState } from "react";
import { useRegisterMutation } from "../../queries/auth/auth";
import { redirect_after_login } from "@config/base";
import { convertUsernameLogic, generateNameFromEmail, generateUsernameFromEmail } from "@helpers/strings";

import ErrorText from "@components/pure/ErrorText";
import StringInput from "@components/inputs/StringInput";
import PasswordInput from "@components/inputs/PasswordInput";
import Link from "@components/pure/Link";
import LandingIntro from "@components/pure/LandingIntro";

const RegisterWrapper = ({ children }: { children: ReactNode }) => {
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

    const [username, setUsername] = useState("@");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
    const [nameErrorMessage, setNameErrorMessage] = useState("");
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");

    const registerMutation = useRegisterMutation();

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
            window.location.href = redirect_after_login;
        }
        if (registerMutation.isError) {
            setErrorMessage(registerMutation.error?.message || "");
            setUsernameErrorMessage(registerMutation.error?.errors?.username?.join("\n") || "");
            setNameErrorMessage(registerMutation.error?.errors?.name?.join("\n") || "");
            setEmailErrorMessage(registerMutation.error?.errors?.email?.join("\n") || "");
            setPasswordErrorMessage(registerMutation.error?.errors?.password?.join("\n") || "");
            setConfirmPasswordErrorMessage(registerMutation.error?.errors?.password?.join("\n") || "");
        }
        if (registerMutation.isLoading) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [registerMutation]);

    return (
        <RegisterWrapper>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <div className="mb-4 flex flex-col gap-4">
                    <StringInput
                        label="Email Address"
                        value={email}
                        setValue={value => {
                            setEmail(value);
                            setUsername(generateUsernameFromEmail(value));
                            setName(generateNameFromEmail(value));
                        }}
                        required={true}
                        errorMessage={emailErrorMessage}
                        id={"email"}
                    />
                    <StringInput
                        label="Username"
                        value={username}
                        setValue={value => setUsername(convertUsernameLogic(value))}
                        required={true}
                        errorMessage={usernameErrorMessage}
                        id={"username"}
                    />
                    <StringInput
                        label="Name"
                        value={name}
                        setValue={value => setName(value)}
                        errorMessage={nameErrorMessage}
                        id={"name"}
                    />

                    <PasswordInput
                        label="Password"
                        value={password}
                        setValue={setPassword}
                        required={true}
                        errorMessage={passwordErrorMessage}
                        id="password"
                    />
                    <PasswordInput
                        label="Password Again"
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        required={true}
                        errorMessage={confirmPasswordErrorMessage}
                        id="confirm-password"
                    />
                </div>

                <ErrorText className="mt-8">{errorMessage}</ErrorText>
                <button type="submit" className={"btn btn-primary mt-2 w-full"}>
                    {loading ? <span className="loading"></span> : ""}
                    Register
                </button>

                <div className="mt-4 text-center">
                    Already have an account? <Link href="/guest/Login">Login</Link>
                </div>
            </form>
        </RegisterWrapper>
    );
};

export default Register;
