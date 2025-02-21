import { httpClient } from "@/lib/api/httpClient";
import { useQuery } from "@tanstack/react-query";
import {
  DownloadFileParams,
  DetailedFile,
  FileListItem,
  FileDTO,
} from "../../types";
import { fileMapper } from "../../mappers/FileMapper";
import { toast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";

export const fileKeys = {
  all: ["files"] as const,
  lists: () => [...fileKeys.all, "list"] as const,
  detail: (id: string) => [...fileKeys.all, "detail", id] as const,
  download: (id: string) => [...fileKeys.all, "download", id] as const,
};

interface FileFilters {
  fileName?: string;
  mimeType?: string;
}

export const useFilesQuery = () => {
  // useFileFilterQuery
  const [searchParams] = useSearchParams();
  const filters: FileFilters = {
    fileName: searchParams.get("fileName") ?? undefined,
    mimeType: searchParams.get("mimeType") ?? undefined,
  };

  return useQuery<FileListItem[]>({
    queryKey: fileKeys.lists(),
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.fileName) params.set("fileName", filters.fileName);
      if (filters.mimeType && filters.mimeType !== "all")
        params.set("mimeType", filters.mimeType);

      const queryString = params.toString();
      const url = `/files${queryString ? `?${queryString}` : ""}`;
      const response = await httpClient.get<FileDTO[]>(url);
      return fileMapper.toFileList(response);
    },
  });
};

export const useFileQuery = (id: string) => {
  return useQuery<DetailedFile>({
    queryKey: fileKeys.detail(id),
    queryFn: async () => {
      const response = await httpClient.get<FileDTO>(`/files/${id}`);
      return fileMapper.toDetailedFile(response);
    },
  });
};

export const useFileDownloadQuery = ({ id, filename }: DownloadFileParams) => {
  return useQuery({
    queryKey: fileKeys.download(id.toString()),
    queryFn: async () => {
      try {
        const blob = await httpClient.getBlob(`/files/unsplit/${id}`);

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        toast({
          title: "Download success",
          description: `File ${filename} has been downloaded`,
        });

        return null;
      } catch (error) {
        toast({
          title: "Download failed",
          description: `${error && error instanceof Error ? error.message : String(error)}`,
          variant: "destructive",
        });
        return null;
      }
    },
    enabled: false,
  });
};
