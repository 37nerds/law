import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "@fetches/auth/auth";

import ErrorText from "@components/pure/ErrorText";
import ForgotPasswordWrapper from "@screens/forgotPassword/ForgotPasswordWrapper";
import LinkSentView from "@screens/forgotPassword/LinkSentView";
import EmailInput from "@components/inputs/EmailInput";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const [emailErrorMessage, setEmailErrorMessage] = useState("");

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [linkSent, setLinkSent] = useState(false);

    const forgotPasswordMutation = useForgotPasswordMutation();

    const handleSubmit = () => {
        setErrorMessage("");

        if (email.trim() === "") {
            return setEmailErrorMessage("Email Id is required!");
        }

        setLoading(true);
        forgotPasswordMutation.mutate(email);
    };

    useEffect(() => {
        if (forgotPasswordMutation.isLoading) {
            setLoading(true);
        } else {
            setLoading(false);
        }

        if (forgotPasswordMutation.isError) {
            setErrorMessage(forgotPasswordMutation.error?.message || "");
            setEmailErrorMessage(forgotPasswordMutation.error?.errors?.email[0] || "");

            setLoading(false);
            setLinkSent(false);
        }

        if (forgotPasswordMutation.isSuccess) {
            console.log(forgotPasswordMutation.data);
            setLoading(false);
            setLinkSent(true);
        }
    }, [forgotPasswordMutation]);

    return (
        <ForgotPasswordWrapper>
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
                                <EmailInput
                                    value={email}
                                    setValue={setEmail}
                                    label="Email Id"
                                    required={true}
                                    errorMessage={emailErrorMessage}
                                    id="email"
                                />
                            </div>

                            <ErrorText className="mt-12">{errorMessage}</ErrorText>
                            <button
                                type="submit"
                                className={"btn btn-primary mt-2 w-full" + (loading ? " loading" : "")}
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
        </ForgotPasswordWrapper>
    );
};

export default ForgotPassword;
