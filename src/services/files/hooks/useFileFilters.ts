import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { fileKeys, useFilesQuery } from "./queries/useFileQuery";
import { queryClient } from "@/lib/query/queryClient";

interface FilterParams {
  fileName: string;
  mimeType: string;
}

export function useFileFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { refetch } = useFilesQuery(); // Toujours appeler le hook, même si on ne l'utilise pas directement

  const filters: FilterParams = useMemo(
    () => ({
      fileName: searchParams.get("fileName") ?? "",
      mimeType: searchParams.get("mimeType") ?? "",
    }),
    [searchParams]
  );

  const updateFilter = useCallback(
    async (key: keyof FilterParams, value: string | null) => {
      setSearchParams((prev) => {
        if (value) {
          prev.set(key, value);
        } else {
          prev.delete(key);
        }
        return prev;
      });

      // Relancer la requête après la mise à jour des filtres
      await queryClient.invalidateQueries({
        queryKey: fileKeys.lists(),
        exact: true,
      });
      await refetch();
    },
    [setSearchParams, refetch]
  );

  return { filters, updateFilter };
}
