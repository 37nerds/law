import { ReactNode } from "react";
import LandingIntro from "../../components/intro/LandingIntro";

const ForgotPasswordWrapper = ({ children }: { children: ReactNode }) => {
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

export default ForgotPasswordWrapper;
