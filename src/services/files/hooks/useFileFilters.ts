import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

interface FilterParams {
  fileName: string;
  mimeType: string;
}

export function useFileFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: FilterParams = {
    fileName: searchParams.get("fileName") ?? "",
    mimeType: searchParams.get("mimeType") ?? "",
  };

  const updateFilter = useCallback(
    (key: keyof FilterParams, value: string | null) => {
      setSearchParams((prev) => {
        if (value) {
          prev.set(key, value);
        } else {
          prev.delete(key);
        }
        return prev;
      });
    },
    [setSearchParams]
  );

  return { filters, updateFilter };
}
