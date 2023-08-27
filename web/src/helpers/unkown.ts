import type { TNotificationType } from "@kinds/general";

import useNotificationStore from "@states/useNotificationStore";

export const is_email = (text: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(text);
};

export const notify = (type: TNotificationType, message: string = "") => {
    useNotificationStore.setState(state => {
        state.notifications.push({ type, message });
        state.lastNotification = { type, message };
    });
};

export const get_username_from_email = (email: string) => {
    return email.split("@")[0];
};

export const get_name_from_email = (email: string) => {
    const name = get_username_from_email(email);
    return name[0].toUpperCase() + name.slice(1);
};
