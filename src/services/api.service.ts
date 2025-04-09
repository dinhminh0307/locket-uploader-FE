

interface RequestOptions {
  headers?: HeadersInit;
  params?: Record<string, string>;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
  }

  /**
   * Perform GET request
   * @param endpoint API endpoint (without base URL)
   * @param options Optional request options
   */
  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = this.buildUrl(endpoint, options.params);
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(options.headers),
    });

    return this.handleResponse<T>(response);
  }

  /**
   * Perform POST request
   * @param endpoint API endpoint (without base URL)
   * @param data Request body data
   * @param options Optional request options
   */
  async post<T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<T> {
    const url = this.buildUrl(endpoint, options.params);
    const response = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(options.headers),
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }

  /**
   * Perform PUT request
   * @param endpoint API endpoint (without base URL)
   * @param data Request body data
   * @param options Optional request options
   */
  async put<T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<T> {
    const url = this.buildUrl(endpoint, options.params);
    const response = await fetch(url, {
      method: 'PUT',
      headers: this.getHeaders(options.headers),
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }

  /**
   * Perform DELETE request
   * @param endpoint API endpoint (without base URL)
   * @param options Optional request options
   */
  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = this.buildUrl(endpoint, options.params);
    const response = await fetch(url, {
      method: 'DELETE',
      headers: this.getHeaders(options.headers),
    });

    return this.handleResponse<T>(response);
  }

  /**
   * Build URL with base URL, endpoint and query parameters
   */
  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    // Ensure endpoint starts with a slash
    if (!endpoint.startsWith('/')) {
      endpoint = `/${endpoint}`;
    }
    
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    if (params) {
      Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
      });
    }
    
    return url.toString();
  }

  /**
   * Get default headers and merge with custom headers
   */
  private getHeaders(customHeaders?: HeadersInit): Headers {
    const headers = new Headers({
      'Content-Type': 'application/json',
      // You can add auth headers here if needed
      // 'Authorization': `Bearer ${getToken()}`
    });

    if (customHeaders) {
      const headerObj = customHeaders instanceof Headers 
        ? Object.fromEntries(customHeaders.entries()) 
        : customHeaders;
      
      Object.entries(headerObj).forEach(([key, value]) => {
        headers.set(key, value as string);
      });
    }

    return headers;
  }

  /**
   * Handle response and parse JSON or throw error
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      // Try to parse error message from response
      let errorMessage = `HTTP error! Status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // Couldn't parse JSON error message, use default
      }
      throw new Error(errorMessage);
    }

    // Check if response is empty (for 204 No Content)
    if (response.status === 204) {
      return {} as T;
    }

    return response.json() as Promise<T>;
  }
}

// Create a singleton instance
const apiService = new ApiService();

export default apiService;