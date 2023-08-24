import useNotificationStore from "@states/useNotificationStore";

const NotificationBody = () => {
    const { notifications } = useNotificationStore();

    return (
        <>
            {notifications.map((notification, index) => (
                <div
                    key={index}
                    className={`bg-layouts-200 card rounded-box mt-3 grid p-3 ${
                        notification.type === "error"
                            ? "bg-error text-white"
                            : notification.type === "success"
                            ? "bg-success text-white"
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
