import { config } from "@/config";
import { FetchOptions } from "./types";

const createHttpClient = () => {
  const request = async <T>(
    endpoint: string,
    { body, headers, ...options }: FetchOptions = {}
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

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          data.error ||
          `Request failed with status ${response.status}`
      );
    }

    return data;
  };

  return {
    get: <T>(endpoint: string, options?: Omit<FetchOptions, "body">) =>
      request<T>(endpoint, { ...options, method: "GET" }),
    post: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
      request<T>(endpoint, { ...options, method: "POST", body }),
    put: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
      request<T>(endpoint, { ...options, method: "PUT", body }),
    delete: <T>(endpoint: string, options?: FetchOptions) =>
      request<T>(endpoint, { ...options, method: "DELETE" }),
  };
};

export const httpClient = createHttpClient();
