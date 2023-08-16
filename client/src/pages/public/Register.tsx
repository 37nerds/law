import { useState } from "react";
import { Link } from "react-router-dom";
import ErrorText from "@components/typographys/ErrorText";
import LandingIntro from "@components/LandingIntro";
import StringInput from "@components/inputs/fields/StringInput";

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [registerData, setRegisterData] = useState({
        name: "",
        password: "",
        email: "",
    });

    const submitForm = () => {
        setErrorMessage("");

        if (registerData.name.trim() === "")
            return setErrorMessage("Name is required! (use any value)");
        if (registerData.email.trim() === "")
            return setErrorMessage("Email Id is required! (use any value)");
        if (registerData.password.trim() === "")
            return setErrorMessage("Password is required! (use any value)");

        setLoading(true);
        // Call API to check user credentials and save token in localstorage
        localStorage.setItem("token", "DumyTokenHere");
        setLoading(false);
        window.location.href = "/app/welcome";
    };

    const updateRegisterData = (key: string, value: string) => {
        setErrorMessage("");
        setRegisterData({ ...registerData, [key ?? ""]: value });
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
                            <div className="mb-4 flex flex-col gap-4">
                                <StringInput
                                    value={registerData.name}
                                    setValue={value =>
                                        updateRegisterData("name", value)
                                    }
                                    required={true}
                                />
                                <StringInput
                                    type="email"
                                    value={registerData.email}
                                    setValue={value =>
                                        updateRegisterData("email", value)
                                    }
                                    required={true}
                                />
                                <StringInput
                                    type="password"
                                    value={registerData.password}
                                    setValue={value =>
                                        updateRegisterData("password", value)
                                    }
                                    required={true}
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
