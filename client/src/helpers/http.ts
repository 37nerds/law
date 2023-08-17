import Log from "@helpers/Log";

export type Response = {
    payload: any;
    code: number;
};

class ApiSingleton {
    private static instance: ApiSingleton;
    private readonly baseUrl: string;

    private constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    static getInstance(baseUrl: string): ApiSingleton {
        if (!ApiSingleton.instance) {
            ApiSingleton.instance = new ApiSingleton(baseUrl);
        }
        return ApiSingleton.instance;
    }

    private async makeRequest(
        method: string,
        endpoint: string,
        requestPayload?: any
    ): Promise<Response> {
        const url = `${this.baseUrl}${endpoint}`;
        const requestOptions: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "User-Agent": "Insomnia/2023.5.3",
            },
        };

        if (requestPayload) {
            requestOptions.body = JSON.stringify(requestPayload);
        }

        let code: number;
        let payload: any = {};

        try {
            const response = await fetch(url, requestOptions);
            payload = await response.json();
            code = response.status;
        } catch (e: any) {
            code = 500;
            payload.message = e?.message;
        }
        return { payload, code };
    }

    async get(endpoint: string) {
        return this.makeRequest("GET", endpoint);
    }

    async post(endpoint: string, data: any) {
        return this.makeRequest("POST", endpoint, data);
    }

    async patch(endpoint: string, data: any) {
        return this.makeRequest("PATCH", endpoint, data);
    }

    async delete(endpoint: string) {
        return this.makeRequest("DELETE", endpoint);
    }
}

const baseUrl = "http://localhost:8000/api/v1";
const http = ApiSingleton.getInstance(baseUrl);

export default http;
