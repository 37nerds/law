import useNotificationStore from "@states/notification_store";

const Notifications = () => {
    const { notifications } = useNotificationStore();

    return (
        <>
            {notifications.map((notification, index) => (
                <div
                    key={index}
                    className={`bg-layouts-200 card rounded-box mt-3 grid p-3 ${
                        notification.type === "error"
                            ? "bg-error text-base-100"
                            : notification.type === "success"
                            ? "bg-success text-base-100"
                            : "bg-base-200"
                    }`}
                >
                    {notification.message}
                </div>
            ))}
        </>
    );
};

export default Notifications;
