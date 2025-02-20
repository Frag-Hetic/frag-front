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

export function formatSizeToBytes(bytes: number) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}
