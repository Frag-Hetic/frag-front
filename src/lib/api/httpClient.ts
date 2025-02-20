import { config } from "@/config";
import { FetchOptions } from "./types";

const createHttpClient = () => {
  const request = async <T>(
    endpoint: string,
    { body, headers, responseType, ...options }: FetchOptions = {}
  ): Promise<T> => {
    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const response = await fetch(`${config.BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        errorMessage || `Request failed with status ${response.status}`
      );
    }

    if (responseType === "blob") {
      return response.blob() as Promise<T>;
    }

    return response.json();
  };

  return {
    get: <T>(endpoint: string, options?: Omit<FetchOptions, "body">) =>
      request<T>(endpoint, { ...options, method: "GET" }),
    getBlob: (endpoint: string, options?: Omit<FetchOptions, "body">) =>
      request<Blob>(endpoint, {
        ...options,
        method: "GET",
        responseType: "blob",
      }),
    post: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
      request<T>(endpoint, { ...options, method: "POST", body }),
    put: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
      request<T>(endpoint, { ...options, method: "PUT", body }),
    delete: <T>(endpoint: string, options?: FetchOptions) =>
      request<T>(endpoint, { ...options, method: "DELETE" }),
  };
};

export const httpClient = createHttpClient();
