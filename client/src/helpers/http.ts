import { TJsonS } from "@kinds/general";

const base = "http://api.develop.sm/api/v1";

const getCookie = (name: string): string => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts?.pop()?.split(";")?.shift() || "";
    }
    return "";
};

const request = (path: string, headers: HeadersInit = {}, options: RequestInit = {}, csrf = true) => {
    const defaultHeaders: HeadersInit = { "Content-Type": "application/json", Accept: "application/json" };
    if (csrf) defaultHeaders["X-XSRF-TOKEN"] = decodeURIComponent(getCookie("XSRF-TOKEN"));

    const defaultOptions: RequestInit = { headers: { ...defaultHeaders, ...headers }, credentials: "include" };

    return fetch(base + path, { ...defaultOptions, ...options });
};

const get = (path: string, headers: HeadersInit = {}, options: RequestInit = {}, csrf = true) => {
    return request(path, headers, { ...options, method: "GET" }, csrf);
};

const post = (path: string, body: TJsonS, headers: HeadersInit = {}, options: RequestInit = {}, csrf = true) => {
    return request(path, headers, { ...options, method: "POST", body: JSON.stringify(body) }, csrf);
};

const patch = (path: string, body: TJsonS, headers: HeadersInit = {}, options: RequestInit = {}, csrf = true) => {
    return request(path, headers, { ...options, method: "PATCH", body: JSON.stringify(body) }, csrf);
};

const _delete = (path: string, headers: HeadersInit = {}, options: RequestInit = {}, csrf: boolean = true) => {
    return request(path, headers, { ...options, method: "DELETE" }, csrf);
};

const http = { request, get, post, patch, delete: _delete };

export default http;
