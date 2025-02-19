export type FetchOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
} & Omit<RequestInit, "body">;
