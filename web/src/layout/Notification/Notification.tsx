import NotificationBody from "./NotificationBody";
import useNotificationStore from "@states/useNotificationStore";

const Notification = () => {
    const { isNotificationOpen, closeNotification } = useNotificationStore();

    return (
        <div
            className={
                "fixed inset-0 z-[100] transform overflow-hidden bg-gray-900 bg-opacity-25 ease-in-out " +
                (isNotificationOpen
                    ? " translate-x-0 opacity-100 transition-opacity duration-500  "
                    : " translate-x-full opacity-0 transition-all delay-500  ")
            }
        >
            <section
                className={
                    "delay-400 bg-layouts-100  absolute right-0 h-full w-80 transform shadow-xl transition-all duration-500 ease-in-out md:w-96  " +
                    (isNotificationOpen ? " translate-x-0 " : " translate-x-full ")
                }
            >
                <NotificationBody />
            </section>
            <section className=" h-full w-screen cursor-pointer" onClick={closeNotification}></section>
        </div>
    );
};

export default Notification;
