import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorText from "@components/typographys/ErrorText";
import LandingIntro from "@components/LandingIntro";
import StringInput from "@components/inputs/fields/StringInput";
import { useMutation } from "react-query";
import { registerUser } from "@external/auth";

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [username, setUsername] = useState("shihab");
    const [name, setName] = useState("Shihab Mahamud");
    const [email, setEmail] = useState("shihabxx@gmail.com");
    const [password, setPassword] = useState("12345678");
    const [confirmPassword, setConfirmPassword] = useState("12345678");

    const registerMutation = useMutation({ mutationFn: registerUser });

    const handleSubmit = () => {
        setLoading(true);
        setErrorMessage("");

        const _name = name.trim();
        const _username = username.trim();
        const _email = email.trim();
        const _password = password.trim();
        const _confirmPassword = confirmPassword.trim();

        if (_username === "") return setErrorMessage("Name is required! (use any value)");
        if (_email === "") return setErrorMessage("Email Id is required! (use any value)");
        if (_password === "") return setErrorMessage("Password is required! (use any value)");
        if (_password !== _confirmPassword) return setErrorMessage("Password and Confirm password not matching");

        registerMutation.mutate({
            name: _name,
            username: _username,
            email: _email,
            password: _password,
        });
    };

    useEffect(() => {
        if (registerMutation.isSuccess) {
            // window.location.href = "/app/welcome";
        }
        if (registerMutation.isError) {
            const errorPayload = registerMutation.error as any;
            setErrorMessage(errorPayload?.message);
        }
        if (registerMutation.isLoading) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [registerMutation]);

    return (
        <div className="flex min-h-screen items-center bg-base-200">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  grid-cols-1 rounded-xl  bg-base-100 md:grid-cols-2">
                    <div className="">
                        <LandingIntro />
                    </div>
                    <div className="px-10 py-24">
                        <h2 className="mb-2 text-center text-2xl font-semibold">Register</h2>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                        >
                            <div className="mb-4 flex flex-col gap-4">
                                <StringInput label="Username" value={username} setValue={setUsername} required={true} />
                                <StringInput label="Name" value={name} setValue={setName} />
                                <StringInput
                                    label="Email Address"
                                    type="email"
                                    value={email}
                                    setValue={setEmail}
                                    required={true}
                                />
                                <StringInput
                                    label="Password"
                                    type="password"
                                    value={password}
                                    setValue={setPassword}
                                    required={true}
                                />
                                <StringInput
                                    label="Password Again"
                                    type="password"
                                    value={confirmPassword}
                                    setValue={setConfirmPassword}
                                    required={true}
                                />
                            </div>

                            <ErrorText className="mt-8">{errorMessage}</ErrorText>
                            <button
                                type="submit"
                                className={"btn-primary btn mt-2 w-full" + (loading ? " loading" : "")}
                            >
                                Register
                            </button>

                            <div className="mt-4 text-center">
                                Already have an account?{" "}
                                <Link to="/login">
                                    <span className="inline-block  transition duration-200 hover:cursor-pointer hover:text-primary hover:underline">
                                        Login
                                    </span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
