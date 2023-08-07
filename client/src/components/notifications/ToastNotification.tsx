import { selectLastNotification } from "@states/app/appSelectors";
import { clearLastNotification, NOTIFICATION_TYPE } from "@states/app/appSlice";
import useDelayedFunction from "@hooks/useDelayedFunction";
import { useAppDispatch } from "@app/hooks";

const ToastNotification = () => {
    const dispatch = useAppDispatch();

    const lastNotification = selectLastNotification();

    useDelayedFunction(
        2 * 1000,
        () => {
            dispatch(clearLastNotification());
        },
        [lastNotification]
    );

    return (
        <>
            {lastNotification ? (
                <div
                    className="toast-end toast toast-top"
                    style={{ zIndex: 99999 }}
                >
                    <div
                        className={`alert w-72 ${
                            lastNotification.type === NOTIFICATION_TYPE.ERROR
                                ? "alert-error"
                                : lastNotification.type ===
                                  NOTIFICATION_TYPE.SUCCESS
                                ? "alert-success"
                                : "alert-info"
                        }`}
                    >
                        <div className="">{lastNotification.message}</div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default ToastNotification;
