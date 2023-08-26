import InputText, { TUpdateFormValue } from "@components/inputs/old/InputText";
import ErrorText from "@components/typographys/ErrorText";
import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";
import { useState } from "react";
import { Link } from "react-router-dom";
import LandingIntro from "@components/LandingIntro";

function ForgotPassword() {
    const INITIAL_USER_OBJ = {
        email: "",
    };

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [linkSent, setLinkSent] = useState(false);
    const [userObj, setUserObj] = useState(INITIAL_USER_OBJ);

    const submitForm = () => {
        setErrorMessage("");

        if (userObj.email.trim() === "") return setErrorMessage("Email Id is required! (use any value)");
        else {
            setLoading(true);
            // Call API to send password reset link
            setLoading(false);
            setLinkSent(true);
        }
    };

    const updateFormValue: TUpdateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setUserObj({ ...userObj, [updateType ?? ""]: value });
    };

    return (
        <div className="flex min-h-screen items-center bg-base-200">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  grid-cols-1 rounded-xl  bg-base-100 md:grid-cols-2">
                    <div className="">
                        <LandingIntro />
                    </div>
                    <div className="px-10 py-24">
                        <h2 className="mb-2 text-center text-2xl font-semibold">Forgot Password</h2>

                        {linkSent && (
                            <>
                                <div className="mt-8 text-center">
                                    <CheckCircleIcon className="inline-block w-32 text-success" />
                                </div>
                                <p className="my-4 text-center text-xl font-bold">Link Sent</p>
                                <p className="mb-8 mt-4 text-center font-semibold">
                                    Check your email to reset password
                                </p>
                                <div className="mt-4 text-center">
                                    <Link to="/login">
                                        <button className="btn-primary btn-block btn ">Login</button>
                                    </Link>
                                </div>
                            </>
                        )}

                        {!linkSent && (
                            <>
                                <p className="my-8 text-center font-semibold">
                                    We will send password reset link on your email Id
                                </p>
                                <form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        submitForm();
                                    }}
                                >
                                    <div className="mb-4">
                                        <InputText
                                            type="emailId"
                                            defaultValue={userObj.email}
                                            updateType="emailId"
                                            containerStyle="mt-4"
                                            labelTitle="Email Id"
                                            updateFormValue={updateFormValue}
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
