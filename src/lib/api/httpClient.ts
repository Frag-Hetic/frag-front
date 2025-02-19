import { config } from "@/config";
import { FetchOptions } from "./types";

export async function httpClient<T>(
  endpoint: string,
  { body, headers, ...options }: FetchOptions = {}
): Promise<T> {
  // Prepare headers
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
    const err = await response.json();
    throw new Error(err.errors || "Request failed");
  }

  return response.json();
}
