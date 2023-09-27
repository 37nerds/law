import useSetPageTitle from "@hooks/useSetPageTitle";

import FaceFrownIcon from "@heroicons/react/24/solid/FaceFrownIcon";

const Page404 = () => {
    useSetPageTitle("404");

    return (
        <div className="hero bg-base-200">
            <div className="hero-content text-center text-accent">
                <div className="max-w-md">
                    <FaceFrownIcon className="inline-block h-48 w-48" />
                    <h1 className="text-5xl  font-bold">404 - Not Found</h1>
                </div>
            </div>
        </div>
    );
};

export default Page404;
