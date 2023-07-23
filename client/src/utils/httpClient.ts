export type Response = {
    data: any;
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
        payload?: any
    ): Promise<Response> {
        const url = `${this.baseUrl}${endpoint}`;
        const requestOptions: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        };

        if (payload) {
            requestOptions.body = JSON.stringify(payload);
        }

        let code: number;
        let data: any;

        try {
            const response = await fetch(url, requestOptions);
            data = await response.json();
            code = response.status;
        } catch (e: any) {
            code = 500;
            data.message = e.message;
        }
        return { data, code };
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
const httpClient = ApiSingleton.getInstance(baseUrl);

export default httpClient;
