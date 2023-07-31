import { useAppDispatch } from "@app/hooks";
import { setPageTitle } from "../../screens/features/common/headerSlice";
import Team from "../../screens/features/settings/team";
import { useEffect } from "react";

function InternalPage() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title: "Team Members" }));
    }, []);

    return <Team />;
}

export default InternalPage;
