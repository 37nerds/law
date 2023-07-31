import { selectNotifications } from "@states/app/appSelectors";
import { NOTIFICATION_TYPE } from "@states/app/appSlice";

const NotificationBody = () => {
    const notifications = selectNotifications();

    return (
        <>
            {notifications.map((notification, index) => (
                <div
                    key={index}
                    className={`bg-layouts-200 card rounded-box mt-3 grid p-3 ${
                        notification.type === NOTIFICATION_TYPE.ERROR
                            ? "bg-error text-white"
                            : notification.type === NOTIFICATION_TYPE.SUCCESS
                            ? "bg-success"
                            : "bg-base-200"
                    }`}
                >
                    {notification.message}
                </div>
            ))}
        </>
    );
};

export default NotificationBody;
