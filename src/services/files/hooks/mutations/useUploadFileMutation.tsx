import { useMutation } from "@tanstack/react-query";
import { httpClient } from "@/lib/api/httpClient";
import { useToast } from "@/hooks/use-toast";
import type { UploadFileData, UploadFileResponse } from "../../types";

export const useUploadFileMutation = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ file }: UploadFileData) => {
      const formData = new FormData();
      formData.append("file", file);

      return httpClient.post<UploadFileResponse>("/files/split", formData);
    },
    onSuccess: (response) => {
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
