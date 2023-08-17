import DocComponentsContent from "@screens/documentation/components/DocComponentsContent";
import DocComponentsNav from "@screens/documentation/components/DocComponentsNav";
import FeaturesContent from "@screens/documentation/components/FeaturesContent";
import FeaturesNav from "@screens/documentation/components/FeaturesNav";
import GettingStartedContent from "@screens/documentation/components/GettingStartedContent";
import GettingStartedNav from "@screens/documentation/components/GettingStartedNav";
import { Link } from "react-router-dom";

function Documentation() {
    return (
        <div className="flex min-h-screen items-center bg-base-200">
            <div className="card mx-auto w-full max-w-4xl  shadow-xl">
                <div className="flex h-screen overflow-hidden rounded-xl bg-base-100  p-10 py-12">
                    <div className="flex-none gap-6 overflow-y-scroll p-4 ">
                        <h1 className="mb-2 text-3xl font-bold">Dashwind</h1>
                        <Link to="/login">
                            <button
                                type="submit"
                                className={"btn-primary btn-xs btn normal-case"}
                            >
                                Live Preview
                            </button>
                        </Link>

                        <GettingStartedNav />
                        <FeaturesNav />
                        <DocComponentsNav />
                    </div>

                    <div className="grow overflow-y-scroll  pt-16">
                        <GettingStartedContent />
                        <FeaturesContent />
                        <DocComponentsContent />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Documentation;
