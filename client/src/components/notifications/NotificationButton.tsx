import { useAppDispatch } from "@app/hooks";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import { selectNotificationsCount } from "@states/app/appSelectors";
import { openRightDrawer } from "@states/app/appSlice";

const NotificationButton = () => {
    const dispatch = useAppDispatch();

    const noOfNotifications = selectNotificationsCount();

    const openNotification = () => {
        dispatch(openRightDrawer());
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

export default NotificationButton;
