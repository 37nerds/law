import type { TNotificationType } from "@helpers/types";

import useNotificationStore from "@states/notification_store";

export const notify = (type: TNotificationType, message: string = "") => {
    useNotificationStore.setState(state => {
        state.notifications.push({ type, message });
        state.lastNotification = { type, message };
    });
};
