import { TNotificationType } from "@kinds/notification";
import useNotificationStore from "@states/useNotificationStore";

const notify = (type: TNotificationType, message: string) => {
    useNotificationStore.setState(state => {
        state.notifications.push({ type, message });
        state.lastNotification = { type, message };
    });
};

export default notify;
