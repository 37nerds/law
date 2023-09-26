import TemplatePointers from "@components/intro/TemplatePointers";
import { Link } from "react-router-dom";
import useSetPageTitle from "@hooks/useSetPageTitle";

function InternalPage() {
    useSetPageTitle("");

    return (
        <div className="hero h-4/5 bg-base-200">
            <div className="hero-content">
                <div className="max-w-md">
                    <TemplatePointers />
                    <Link to="/_/dashboard">
                        <button className="btn btn-outline bg-base-100">Get Started</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default InternalPage;
