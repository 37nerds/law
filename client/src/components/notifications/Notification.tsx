import NotificationBody from "./NotificationBody";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { useAppDispatch } from "@app/hooks";
import { clearNotifications, closeRightDrawer } from "@states/app/appSlice";

const Notification = () => {
    const dispatch = useAppDispatch();
    const close = () => {
        dispatch(closeRightDrawer());
    };

    return (
        <div className="relative flex h-full flex-col bg-base-100/95 pb-5">
            {/* Header */}
            <div className="navbar flex justify-between pl-4 pr-4  shadow-md ">
                <div>
                    <button
                        className="btn-outline btn-sm btn-circle btn float-left"
                        onClick={() => close()}
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                    <span className="ml-2 text-xl font-bold">
                        Notifications
                    </span>
                </div>
                <div>
                    <button
                        className="btn-ghost btn"
                        onClick={() => dispatch(clearNotifications())}
                    >
                        Clear
                    </button>
                </div>
            </div>

            {/* ------------------ Content Start ------------------ */}
            <div className="overflow-y-scroll pl-4 pr-4">
                <div className="flex w-full flex-col">
                    {/* Loading drawer body according to different drawer type */}
                    <NotificationBody />
                </div>
            </div>
            {/* ------------------ Content End ------------------ */}
        </div>
    );
};

export default Notification;
