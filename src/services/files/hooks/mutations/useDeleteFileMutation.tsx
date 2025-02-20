import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/lib/api/httpClient";
import { fileKeys } from "../queries/useFileQuery";
import { toast } from "@/hooks/use-toast";

export const useDeleteFileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await httpClient.delete(`/files/${id}`);
    },
    onSuccess: (_, id) => {
      toast({
        title: "File deleted",
        description: `File with id ${id} has been deleted`,
      });

      queryClient.invalidateQueries({ queryKey: fileKeys.lists() }); // Mise à jour de la liste
    },
    onError: (error: unknown) => {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete user",
        variant: "destructive",
      });
    },
  });
};
