import { useMutation } from "@tanstack/react-query";
import { httpClient } from "@/lib/api/httpClient";
import { useToast } from "@/hooks/use-toast";
import type { UploadFileData, UploadFileResponse } from "../../types";
import { queryClient } from "@/lib/query/queryClient";
import { fileKeys } from "../queries/useFileQuery";

export const useUploadFileMutation = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ file, config }: UploadFileData) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("windowSize", config.windowSize.toString());
      formData.append("chunkMinSize", config.chunkMinSize.toString());
      formData.append("chunkMaxSize", config.chunkMaxSize.toString());
      formData.append("breakpointMask", config.breakpointMask);

      return httpClient.post<UploadFileResponse>("/files/split", formData);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: fileKeys.lists() });
      toast({
        title: "Success",
        description: response.message || "File uploaded successfully",
      });
    },
    onError: (error: unknown) => {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to upload file",
        variant: "destructive",
      });
    },
  });
};
