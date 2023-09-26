import BellIcon from "@heroicons/react/24/outline/BellIcon";
import useNotificationStore from "@states/useNotificationStore";

const NotificationButton = () => {
    const { notifications, openNotification } = useNotificationStore();

    const noOfNotifications = notifications?.length || 0;

    return (
        <button className="btn btn-circle btn-ghost  ml-4" onClick={openNotification}>
            <div className="indicator">
                <BellIcon className="h-6 w-6" />
                {noOfNotifications > 0 ? (
                    <span className="badge indicator-item badge-secondary badge-sm">{noOfNotifications}</span>
                ) : null}
            </div>
        </button>
    );
};

export default NotificationButton;
