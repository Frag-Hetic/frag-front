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

export const fileKeys = {
  all: ["files"] as const,
  lists: () => [...fileKeys.all, "list"] as const,
  detail: (id: string) => [...fileKeys.all, "detail", id] as const,
  download: (id: string) => [...fileKeys.all, "download", id] as const,
};

export const useFilesQuery = () => {
  // useFileFilterQuery
  return useQuery<FileListItem[]>({
    queryKey: fileKeys.lists(),
    queryFn: async () => {
      const response = await httpClient.get<FileDTO[]>("/files");
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
