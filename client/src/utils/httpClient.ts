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
        data?: any
    ): Promise<any> {
        const url = `${this.baseUrl}${endpoint}`;
        const requestOptions: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        };

        if (data) {
            requestOptions.body = JSON.stringify(data);
        }

        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    }

    async get(endpoint: string): Promise<any> {
        return this.makeRequest("GET", endpoint);
    }

    async post(endpoint: string, data: any): Promise<any> {
        return this.makeRequest("POST", endpoint, data);
    }

    async patch(endpoint: string, data: any): Promise<any> {
        return this.makeRequest("PATCH", endpoint, data);
    }

    async delete(endpoint: string): Promise<any> {
        return this.makeRequest("DELETE", endpoint);
    }
}

const baseUrl = "http://localhost:8000/api/v1";
const httpClient = ApiSingleton.getInstance(baseUrl);

export default httpClient;
