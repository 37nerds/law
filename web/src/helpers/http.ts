import type { TJsonS, TQueries, TResponse } from "@helpers/types";

import { server_base_url } from "@config/env";

import log from "@helpers/log";

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

const get = async (path: string, happy: number, csrf = true): Promise<any> => {
    return lara_request("GET", path, null, happy, { csrf });
};

const post = async (path: string, body: TJsonS, happy: number, csrf = true): Promise<any> => {
    return lara_request("POST", path, JSON.stringify(body), happy, { csrf });
};

const form_post = async (path: string, body: FormData, happy: number, csrf = true): Promise<any> => {
    return await lara_request("POST", path, body, happy, {
        contentType: "x/none",
        csrf,
    });
};

const csrf_post = async (path: string, body: TJsonS, happy: number, csrf = true): Promise<any> => {
    await http.get("/csrf-cookie", 204, false);
    return http.post(path, body, happy, csrf);
};

const patch = (path: string, body: TJsonS, happy: number, csrf = true): Promise<any> => {
    return lara_request("PATCH", path, JSON.stringify(body), happy, { csrf });
};

const _delete = (path: string, happy: number, csrf: boolean = true): Promise<any> => {
    return lara_request("DELETE", path, null, happy, { csrf });
};

const buildQueryString = (queries: TQueries) => {
    return [...Object.keys(queries)].reduce((s, key) => s + `&${key}=${queries[key]}`, "?f=b");
};

const get_q = async (path: string, queries: TQueries = {}, happy: number, csrf = true): Promise<any> => {
    return get(path + buildQueryString(queries), happy, csrf);
};

const post_q = async (
    path: string,
    queries: TQueries = {},
    body: TJsonS,
    happyStatus: number,
    csrf = true
): Promise<any> => {
    return post(path + buildQueryString(queries), body, happyStatus, csrf);
};

const patch_q = async (
    path: string,
    queries: TQueries = {},
    body: TJsonS,
    happy: number,
    csrf = true
): Promise<any> => {
    return patch(path + buildQueryString(queries), body, happy, csrf);
};

const delete_q = async (path: string, queries: TQueries = {}, happy: number, csrf = true): Promise<any> => {
    return _delete(path + buildQueryString(queries), happy, csrf);
};

const form_post_q = async (
    path: string,
    queries: TQueries = {},
    body: FormData,
    happy: number,
    csrf = true
): Promise<any> => {
    return form_post(path + buildQueryString(queries), body, happy, csrf);
};

const http = {
    lara_request,
    get,
    post,
    csrf_post,
    form_post,
    patch,
    delete: _delete,
    get_q,
    post_q,
    patch_q,
    delete_q,
    form_post_q,
};

export default http;
