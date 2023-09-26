import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { TNotification } from "../types";

type TState = {
    notifications: TNotification[];
    lastNotification: TNotification | null;
    isNotificationOpen: boolean;
};

type TAction = {
    addNotification: (notification: TNotification) => void;
    clearNotifications: () => void;
    clearLastNotification: () => void;
    openNotification: () => void;
    closeNotification: () => void;
    toggleNotification: () => void;
};

const useNotificationStore = create<TState & TAction>()(
    immer(
        devtools(set => ({
            notifications: [],
            lastNotification: null,
            addNotification: notification => {
                set(state => {
                    state.notifications.push({
                        message: notification.message,
                        type: notification.type,
                    });
                    state.lastNotification = {
                        message: notification.message,
                        type: notification.type,
                    };
                });
            },
            clearNotifications: () => {
                set(state => {
                    state.notifications = [];
                });
            },
            clearLastNotification: () => {
                set(state => {
                    state.lastNotification = null;
                });
            },
            isNotificationOpen: false,
            openNotification: () => {
                set(state => {
                    state.isNotificationOpen = true;
                });
            },
            closeNotification: () => {
                set(state => {
                    state.isNotificationOpen = false;
                });
            },
            toggleNotification: () => {
                set(state => {
                    state.isNotificationOpen = !state.isNotificationOpen;
                });
            },
        }))
    )
);

export default useNotificationStore;
