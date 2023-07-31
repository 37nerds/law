import { useAppDispatch } from "@app/hooks";
import { setPageTitle } from "../../screens/features/common/headerSlice";
import TemplatePointers from "../../screens/features/user/components/TemplatePointers";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function InternalPage() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title: "" }));
    }, []);

    return (
        <div className="hero h-4/5 bg-base-200">
            <div className="hero-content">
                <div className="max-w-md">
                    <TemplatePointers />
                    <Link to="/app/dashboard">
                        <button className="btn-outline btn bg-base-100">
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default InternalPage;
