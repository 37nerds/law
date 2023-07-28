import { useState } from "react";
import { Link } from "react-router-dom";
import InputText, { TUpdateFormValue } from "@components/inputs/old/InputText";
import ErrorText from "@components/typographys/ErrorText";
import LandingIntro from "./LandingIntro";

function Register() {
    const INITIAL_REGISTER_OBJ = {
        name: "",
        password: "",
        emailId: "",
    };

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);

    const submitForm = () => {
        setErrorMessage("");

        if (registerObj.name.trim() === "")
            return setErrorMessage("Name is required! (use any value)");
        if (registerObj.emailId.trim() === "")
            return setErrorMessage("Email Id is required! (use any value)");
        if (registerObj.password.trim() === "")
            return setErrorMessage("Password is required! (use any value)");
        else {
            setLoading(true);
            // Call API to check user credentials and save token in localstorage
            localStorage.setItem("token", "DumyTokenHere");
            setLoading(false);
            window.location.href = "/app/welcome";
        }
    };

    const updateFormValue: TUpdateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setRegisterObj({ ...registerObj, [updateType ?? ""]: value });
    };

    return (
        <div className="flex min-h-screen items-center bg-base-200">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  grid-cols-1 rounded-xl  bg-base-100 md:grid-cols-2">
                    <div className="">
                        <LandingIntro />
                    </div>
                    <div className="px-10 py-24">
                        <h2 className="mb-2 text-center text-2xl font-semibold">
                            Register
                        </h2>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                submitForm();
                            }}
                        >
                            <div className="mb-4">
                                <InputText
                                    defaultValue={registerObj.name}
                                    updateType="name"
                                    containerStyle="mt-4"
                                    labelTitle="Name"
                                    updateFormValue={updateFormValue}
                                />

                                <InputText
                                    defaultValue={registerObj.emailId}
                                    updateType="emailId"
                                    containerStyle="mt-4"
                                    labelTitle="Email Id"
                                    updateFormValue={updateFormValue}
                                />

                                <InputText
                                    defaultValue={registerObj.password}
                                    type="password"
                                    updateType="password"
                                    containerStyle="mt-4"
                                    labelTitle="Password"
                                    updateFormValue={updateFormValue}
                                />
                            </div>

                            <ErrorText styleClass="mt-8">
                                {errorMessage}
                            </ErrorText>
                            <button
                                type="submit"
                                className={
                                    "btn-primary btn mt-2 w-full" +
                                    (loading ? " loading" : "")
                                }
                            >
                                Register
                            </button>

                            <div className="mt-4 text-center">
                                Already have an account?{" "}
                                <Link to="/login">
                                    <span className="  inline-block  transition duration-200 hover:cursor-pointer hover:text-primary hover:underline">
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
}

export default Register;
