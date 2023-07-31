import { useAppDispatch, useAppSelector } from "@app/hooks";
import { removeNotificationMessage } from "@states/app/headerSlice";
import { useEffect } from "react";
import LeftSidebar from "./LeftSidebar";
import ModalLayout from "./ModalLayout";
import PageContent from "./PageContent";
import RightSidebar from "./RightSidebar";

const Layout = () => {
    const dispatch = useAppDispatch();
    const { newNotificationMessage, newNotificationStatus } = useAppSelector(
        state => state.header
    );

    useEffect(() => {
        if (newNotificationMessage !== "") {
            if (newNotificationStatus === 1)
                console.log(newNotificationMessage, "Success");
            if (newNotificationStatus === 0)
                console.error(newNotificationMessage, "Error");
            dispatch(removeNotificationMessage());
        }
    }, [newNotificationMessage]);

    return (
        <>
            {/* Left drawer - containing page content and side bar (always open) */}
            <div className="drawer-mobile drawer">
                <input
                    id="left-sidebar-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <PageContent />
                <LeftSidebar />
            </div>

            {/* Right drawer - containing secondary content like notifications list etc.. */}
            <RightSidebar />

            {/** NotificationButton layout container */}
            {/* todo */}

            {/* Modal layout container */}
            <ModalLayout />
        </>
    );
};

export default Layout;
