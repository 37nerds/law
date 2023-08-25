import { TJsonS, TResponse } from "@kinds/general";
import { SERVER_BASE_URL } from "@helpers/env";

const getCookie = (name: string): string => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts?.pop()?.split(";")?.shift() || "";
    }
    return "";
};

const rowRequest = async (uri: string, options: RequestInit): Promise<TResponse> => {
    try {
        const response = await fetch(uri, options);
        return { status: response.status, payload: response.status !== 204 ? await response.json() : {} };
    } catch (e: any) {
        console.log(e);
        return { status: 400, payload: { message: e?.message, type: "Unknown (In Client)" } };
    }
};

const request = async (
    path: string,
    happyStatus: number,
    headers: HeadersInit = {},
    options: RequestInit = {},
    csrf = true
) => {
    const defaultHeaders: HeadersInit = { "Content-Type": "application/json", Accept: "application/json" };
    if (csrf) defaultHeaders["X-XSRF-TOKEN"] = decodeURIComponent(getCookie("XSRF-TOKEN"));

    const defaultOptions: RequestInit = { headers: { ...defaultHeaders, ...headers }, credentials: "include" };

    const { status, payload } = await rowRequest(SERVER_BASE_URL + path, { ...defaultOptions, ...options });
    if (status !== happyStatus) {
        throw payload;
    }
    return payload;
};

const get = async (
    path: string,
    happyStatus: number,
    headers: HeadersInit = {},
    options: RequestInit = {},
    csrf = true
): Promise<any> => {
    return request(path, happyStatus, headers, { ...options, method: "GET" }, csrf);
};

const post = async (
    path: string,
    body: TJsonS,
    happyStatus: number,
    headers: HeadersInit = {},
    options: RequestInit = {},
    csrf = true
): Promise<any> => {
    return await request(path, happyStatus, headers, { ...options, method: "POST", body: JSON.stringify(body) }, csrf);
};

const patch = (
    path: string,
    body: TJsonS,
    happyStatus: number,
    headers: HeadersInit = {},
    options: RequestInit = {},
    csrf = true
): Promise<any> => {
    return request(path, happyStatus, headers, { ...options, method: "PATCH", body: JSON.stringify(body) }, csrf);
};

const _delete = (
    path: string,
    happyStatus: number,
    headers: HeadersInit = {},
    options: RequestInit = {},
    csrf: boolean = true
): Promise<any> => {
    return request(path, happyStatus, headers, { ...options, method: "DELETE" }, csrf);
};

const http = { request, get, post, patch, delete: _delete };

export default http;
