import type { TJsonS, TResponse } from "@kinds/general";
import { server_base_url } from "@helpers/env";

import log from "@helpers/Log";

const get_cookie = (name: string): string => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts?.pop()?.split(";")?.shift() || "";
    }
    return "";
};

const row_request = async (uri: string, options: RequestInit): Promise<TResponse> => {
    try {
        const response = await fetch(uri, options);
        return { status: response.status, payload: response.status !== 204 ? await response.json() : {} };
    } catch (e: any) {
        log.error(e);
        return { status: 400, payload: { message: e?.message, type: "Unknown (In Client)" } };
    }
};

const lara_request = async (
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    path: string,
    body: any,
    happy: number,
    {
        csrf = true,
        credentials = "include",
        accept = "application/json",
        contentType = "application/json",
    }: {
        csrf?: boolean;
        credentials?: RequestCredentials;
        accept?: string | "x/none";
        contentType?: string | "x/none";
    } = {}
): Promise<TJsonS> => {
    const headers: HeadersInit = {};

    if (csrf) {
        headers["X-XSRF-TOKEN"] = decodeURIComponent(get_cookie("XSRF-TOKEN"));
    }

    if (accept !== "x/none") {
        headers["Accept"] = accept;
    }

    if (contentType !== "x/none") {
        headers["Content-Type"] = contentType;
    }

    const response = await row_request(server_base_url + path, {
        method: method,
        body: body,
        headers: headers,
        credentials: credentials,
    });

    if (response.status !== happy) {
        throw response.payload;
    }

    return response.payload;
};

const get = async (path: string, happyStatus: number, csrf = true): Promise<any> => {
    return lara_request("GET", path, null, happyStatus, { csrf });
};

const post = async (path: string, body: TJsonS, happyStatus: number, csrf = true): Promise<any> => {
    return lara_request("POST", path, JSON.stringify(body), happyStatus, { csrf });
};

const form_post = async (path: string, body: FormData, happyStatus: number, csrf = true): Promise<any> => {
    console.log("FC");
    return await lara_request("POST", path, body, happyStatus, {
        contentType: "x/none",
        csrf,
    });
};

const csrf_post = async (path: string, body: TJsonS, happyStatus: number, csrf = true): Promise<any> => {
    await http.get("/csrf-cookie", 204, false);
    return http.post(path, body, happyStatus, csrf);
};

const patch = (path: string, body: TJsonS, happyStatus: number, csrf = true): Promise<any> => {
    return lara_request("PATCH", path, JSON.stringify(body), happyStatus, { csrf });
};

const _delete = (path: string, happyStatus: number, csrf: boolean = true): Promise<any> => {
    return lara_request("DELETE", path, null, happyStatus, { csrf });
};

const http = { lara_request, get, post, csrf_post, form_post, patch, delete: _delete };

export default http;
