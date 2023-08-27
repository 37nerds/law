import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";

import ErrorText from "@components/pure/ErrorText";
import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";
import LandingIntro from "@components/intro/LandingIntro";
import StringInput from "@components/inputs/StringInput";

const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex min-h-screen items-center bg-base-200">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  grid-cols-1 rounded-xl  bg-base-100 md:grid-cols-2">
                    <div className="">
                        <LandingIntro />
                    </div>
                    <div className="px-10 py-24">
                        <h2 className="mb-2 text-center text-2xl font-semibold">Forgot Password</h2>

                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

const LinkSentView = () => {
    return (
        <>
            <div className="mt-8 text-center">
                <CheckCircleIcon className="inline-block w-32 text-success" />
            </div>
            <p className="my-4 text-center text-xl font-bold">Link Sent</p>
            <p className="mb-8 mt-4 text-center font-semibold">Check your email to reset password</p>
            <div className="mt-4 text-center">
                <Link to="/login">
                    <button className="btn-primary btn-block btn ">Login</button>
                </Link>
            </div>
        </>
    );
};

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const [emailErrorMessage, setEmailErrorMessage] = useState("");

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [linkSent, setLinkSent] = useState(false);

    const handleSubmit = () => {
        setErrorMessage("");

        if (email.trim() === "") {
            return setEmailErrorMessage("Email Id is required!");
        }

        setLoading(true);
        // Call API to send password reset link

        setLoading(false);
        setLinkSent(true);
    };

    return (
        <Wrapper>
            <>
                {linkSent ? (
                    <LinkSentView />
                ) : (
                    <>
                        <p className="my-8 text-center font-semibold">
                            We will send password reset link on your email Id
                        </p>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                        >
                            <div className="mb-4">
                                <StringInput
                                    value={email}
                                    setValue={setEmail}
                                    type="email"
                                    label="Email Id"
                                    required={true}
                                    errorMessage={emailErrorMessage}
                                />
                            </div>

                            <ErrorText className="mt-12">{errorMessage}</ErrorText>
                            <button
                                type="submit"
                                className={"btn-primary btn mt-2 w-full" + (loading ? " loading" : "")}
                            >
                                Send Reset Link
                            </button>

                            <div className="mt-4 text-center">
                                Don't have an account yet?{" "}
                                <Link to="/register">
                                    <button className="  inline-block  transition duration-200 hover:cursor-pointer hover:text-primary hover:underline">
                                        Register
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </>
                )}
            </>
        </Wrapper>
    );
};

export default ForgotPassword;
