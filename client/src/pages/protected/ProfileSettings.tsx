import { useAppDispatch } from "@app/hooks";
import { setPageTitle } from "../../screens/features/common/headerSlice";
import ProfileSettings from "../../screens/features/settings/profilesettings";
import { useEffect } from "react";

function InternalPage() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title: "Settings" }));
    }, []);

    return <ProfileSettings />;
}

export default InternalPage;
