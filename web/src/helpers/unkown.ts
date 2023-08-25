import useNotificationStore from "@states/useNotificationStore";

import { TNotificationType } from "@kinds/general";

export const isEmail = (text: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(text);
};

const notify = (type: TNotificationType, message: string) => {
    useNotificationStore.setState(state => {
        state.notifications.push({ type, message });
        state.lastNotification = { type, message };
    });
};

export default notify;
