import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";
import { Link } from "react-router-dom";

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
                    <button className="btn btn-primary btn-block ">Login</button>
                </Link>
            </div>
        </>
    );
};

export default LinkSentView;
