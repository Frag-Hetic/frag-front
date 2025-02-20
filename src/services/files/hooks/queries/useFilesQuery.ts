import { httpClient } from "@/lib/api/httpClient";
import { useQuery } from "@tanstack/react-query";
import { File, FileDTO } from "../../types";
import { fileMapper } from "../../mappers/FileMapper";

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
