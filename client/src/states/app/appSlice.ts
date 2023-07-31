import { createSlice } from "@reduxjs/toolkit";

export const NOTIFICATION_TYPE = {
    ERROR: "error",
    SUCCESS: "success",
};

export type Notification = {
    message: string;
    type: string;
};

const initialState: {
    isRightDrawerOpen: boolean;
    notifications: Notification[];
    lastNotification: Notification | null;
} = {
    isRightDrawerOpen: false,
    notifications: [],
    lastNotification: null,
};

export const customerSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        addNotification: (state, action) => {
            const notification: Notification = action.payload;
            state.notifications.push({
                message: notification.message,
                type: notification.type,
            });
            state.lastNotification = {
                message: notification.message,
                type: notification.type,
            };
        },
        clearNotifications: state => {
            state.notifications = [];
        },
        clearLastNotification: state => {
            state.lastNotification = null;
        },
        openRightDrawer: state => {
            state.isRightDrawerOpen = true;
        },
        closeRightDrawer: state => {
            state.isRightDrawerOpen = false;
        },
    },
});

export const {
    addNotification,
    clearNotifications,
    clearLastNotification,
    openRightDrawer,
    closeRightDrawer,
} = customerSlice.actions;
export default customerSlice;
