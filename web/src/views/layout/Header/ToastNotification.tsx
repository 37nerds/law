import useDelayedFunction from "@hooks/useDelayedFunction";
import useNotificationStore from "@states/useNotificationStore";

const ToastNotification = () => {
    const { lastNotification, clearLastNotification } = useNotificationStore();

    useDelayedFunction(
        2 * 1000,
        () => {
            clearLastNotification();
        },
        [lastNotification]
    );

    return (
        <>
            {lastNotification ? (
                <div className="toast toast-end toast-top" style={{ zIndex: 99999 }}>
                    <div
                        className={`alert w-72 ${
                            lastNotification.type === "error"
                                ? "alert-error"
                                : lastNotification.type === "success"
                                ? "alert-success"
                                : "alert-info"
                        }`}
                    >
                        {lastNotification.message}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default ToastNotification;
