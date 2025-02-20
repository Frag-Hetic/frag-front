import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapStringToDateFormat(date: string) {
  return new Date(date).toLocaleString();
}

export function formatSizeToMbSize(size: number) {
  const MB = size / (1024 * 1024);
  if (MB < 0.01) {
    return "< 0.01 MB";
  }
  return `${MB.toFixed(2)} MB`;
}
