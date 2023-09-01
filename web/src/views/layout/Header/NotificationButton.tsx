import BellIcon from "@heroicons/react/24/outline/BellIcon";
import useNotificationStore from "@states/useNotificationStore";

const NotificationButton = () => {
    const { notifications, openNotification } = useNotificationStore();

    const noOfNotifications = notifications?.length || 0;

    return (
        <button className="btn-ghost btn-circle btn  ml-4" onClick={openNotification}>
            <div className="indicator">
                <BellIcon className="h-6 w-6" />
                {noOfNotifications > 0 ? (
                    <span className="badge-secondary badge badge-sm indicator-item">{noOfNotifications}</span>
                ) : null}
            </div>
        </button>
    );
};

export default NotificationButton;
