import { useAppDispatch } from "@app/hooks";
import { setPageTitle } from "@features/common/headerSlice";
import Team from "@features/settings/team";
import { useEffect } from "react";

function InternalPage() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title: "Team Members" }));
    }, []);

    return <Team />;
}

export default InternalPage;
