import { useAppDispatch } from "@app/hooks";
import { setPageTitle } from "@states/app/headerSlice";
import Team from "@components/features/settings/team";
import { useEffect } from "react";

function InternalPage() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title: "Team Members" }));
    }, []);

    return <Team />;
}

export default InternalPage;
