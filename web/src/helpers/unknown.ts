import type { TNotificationType } from "@kinds/general";
import { assert_storage_url } from "@config/env";
import { useParams } from "react-router-dom";

import useNotificationStore from "@states/useNotificationStore";
import sh from "../facades/sh";

export const isEmail = (text: string): boolean => {
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

export const convertUsernameLogic = (text: string) => {
    return text[0] !== "@" ? `@${text}` : text;
};

export const usePrepareUrlForSidebarLink = () => {
    const params = useParams();
    return (path: string, defaults?: Record<string, any>) => {
        if (!defaults) return path;
        const parts = path.split(":").map(part => {
            let x = sh(part).lastCharacter().toString() == "/" ? sh(part).removeLastCharacter().toString() : part;
            return params[x] ? params[x] || "" : defaults[x] ? defaults[x] : x;
        });
        return parts.join("/");
    };
};
