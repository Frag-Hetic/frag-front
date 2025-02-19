export type FetchOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
} & Omit<RequestInit, "body">;

export interface ApiResponse<T = null> {
  status: "success" | "error";
  message: string;
  data?: T;
}
