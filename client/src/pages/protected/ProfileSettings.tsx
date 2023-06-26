import { useAppDispatch } from "@app/hooks";
import { setPageTitle } from "@features/common/headerSlice";
import ProfileSettings from "@features/settings/profilesettings";
import { useEffect } from "react";

function InternalPage() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title: "Settings" }));
    }, []);

    return <ProfileSettings />;
}

export default InternalPage;
