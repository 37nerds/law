import type { TNotificationType } from "@helpers/types";

import useNotificationStore from "@states/useNotificationStore";

const log = {
    print: (...data: any[]) => {
        console.log(...data);
    },

    info: (...data: any[]) => {
        console.info(data);
    },

    warn: (...data: any[]) => {
        console.warn(data);
    },

    error: (...data: any[]) => {
        console.error(data);
    },
};

export default log;

export const notify = (type: TNotificationType, message: string = "") => {
    useNotificationStore.setState(state => {
        state.notifications.push({ type, message });
        state.lastNotification = { type, message };
    });
};
