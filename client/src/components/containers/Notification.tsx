import { useAppDispatch } from "@app/hooks";
import { openRightDrawer } from "../../screens/features/common/rightDrawerSlice";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import { RIGHT_DRAWER_TYPES } from "@utils/globalConstantUtil";

const Notification = () => {
    const dispatch = useAppDispatch();

    const noOfNotifications = 100;

    // Opening right sidebar for notification
    const openNotification = () => {
        dispatch(
            openRightDrawer({
                header: "Notifications",
                bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION,
            })
        );
    };

    return (
        <button
            className="btn-ghost btn-circle btn  ml-4"
            onClick={() => openNotification()}
        >
            <div className="indicator">
                <BellIcon className="h-6 w-6" />
                {noOfNotifications > 0 ? (
                    <span className="badge badge-secondary badge-sm indicator-item">
                        {noOfNotifications}
                    </span>
                ) : null}
            </div>
        </button>
    );
};

export default Notification;
