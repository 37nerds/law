import { useAppSelector } from "@app/hooks";
import { Notification } from "@states/app/appSlice";

export const selectApp = () => {
    return useAppSelector(state => state.app);
};

export const selectNotifications = () => {
    return selectApp().notifications;
};

export const selectNotificationsCount = () => {
    return selectNotifications()?.length || 0;
};

export const selectLastNotification = (): Notification | null => {
    return selectApp().lastNotification;
};
