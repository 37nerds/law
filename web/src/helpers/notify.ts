import type { TNotificationType } from "src/types";

import useNotificationStore from "@states/useNotificationStore";

export const notify = (type: TNotificationType, message: string = "") => {
    useNotificationStore.setState(state => {
        state.notifications.push({ type, message });
        state.lastNotification = { type, message };
    });
};
