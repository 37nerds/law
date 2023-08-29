import type { TNotificationType } from "@kinds/general";

import useNotificationStore from "@states/useNotificationStore";
import { assert_storage_url } from "@helpers/env";

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

export const generateUsernameFromEmail = (email: string) => {
    return "@" + (email.split("@")[0]?.toLowerCase() || "");
};

export const generateNameFromEmail = (email: string) => {
    const name = generateUsernameFromEmail(email);

    if (name.length == 1) {
        return "";
    }

    if (name.length == 2) {
        return name[1].toUpperCase();
    }

    return name[1].toUpperCase() + name.slice(2);
};

export const isLink = (value: string): boolean => {
    const linkPattern = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/i;
    return linkPattern.test(value);
};

export const getProfileUrlFromAvatarKey = (avatar: string): string => {
    return isLink(avatar) ? avatar : `${assert_storage_url}/storage/profile/picture/${avatar}`;
};
