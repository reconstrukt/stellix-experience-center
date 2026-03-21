const defaultOptions = {
    headers: {
        'Content-Type': 'application/json',
    },
};

class LocalApiService {
    constructor() {
        this.baseUrl = '/api';
    }

    async fetch(endpoint, options = {}, _retryCount = 0) {
        const normalizedBaseUrl = this.baseUrl?.endsWith('/') ? this.baseUrl.slice(0, -1) : this.baseUrl;
        const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        const url = `${normalizedBaseUrl}${normalizedEndpoint}`;
        const fetchOptions = { ...defaultOptions, ...options };
        if (fetchOptions.body) {
            fetchOptions.body = JSON.stringify(fetchOptions.body);
        }

        const response = await fetch(url, fetchOptions);
        let data = {};
        try {
            data = await response.json();
        } catch (e) {
            // .. data was not JSON
        }
        if (!data?.statusCode) {
            data.statusCode = response.status;
        }
        if (!data?.success) {
            data.success = !!response.ok;
        }
        return data;
    }

    getContentVersion() {
        return this.fetch('/content-version');
    }
}

export default new LocalApiService();
