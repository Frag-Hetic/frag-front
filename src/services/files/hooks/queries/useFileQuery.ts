import { httpClient } from "@/lib/api/httpClient";
import { useQuery } from "@tanstack/react-query";
import { DetailedFile, File, FileDTO } from "../../types";
import { fileMapper } from "../../mappers/FileMapper";
import { config } from "@/config";

export const fileKeys = {
  all: ["files"] as const,
  lists: () => [...fileKeys.all, "list"] as const,
  detail: (id: string) => [...fileKeys.all, "detail", id] as const,
};

export const useFilesQuery = () => {
  return useQuery<File[]>({
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

export const useFileDownloadQuery = (id: number, name: string) => {
  return useQuery({
    queryKey: fileKeys.detail(id.toString()),
    queryFn: async () => {
      const response = await fetch(`${config.BASE_URL}/files/unsplit/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/octet-stream",
        },
      });

      if (!response.ok) {
        throw new Error(`Download failed with status ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      return null;
    },
    enabled: false,
  });
};
