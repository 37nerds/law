import Notifications from "./Notifications";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import useNotificationStore from "@states/useNotificationStore";

const NotificationBody = () => {
    const { closeNotification, clearNotifications } = useNotificationStore();

    return (
        <div className="relative flex h-full flex-col bg-base-100/95 pb-5">
            {/* Header */}
            <div className="navbar flex justify-between pl-4 pr-4  shadow-md ">
                <div>
                    <button className="btn btn-circle btn-outline btn-sm float-left" onClick={closeNotification}>
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                    <span className="ml-2 text-xl font-bold">Notifications</span>
                </div>
                <div>
                    <button className="btn btn-ghost" onClick={clearNotifications}>
                        Clear
                    </button>
                </div>
            </div>

            {/* ------------------ Content Start ------------------ */}
            <div className="overflow-y-scroll pl-4 pr-4">
                <div className="flex w-full flex-col">
                    {/* Loading drawer body according to different drawer type */}
                    <Notifications />
                </div>
            </div>
            {/* ------------------ Content End ------------------ */}
        </div>
    );
};

export default NotificationBody;
