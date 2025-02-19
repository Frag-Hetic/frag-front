import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/lib/api/httpClient";
import { userKeys } from "../queries/useUserQuery";
import { useToast } from "@/hooks/use-toast";
import type { ApiResponse } from "@/lib/api/types";

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (userId: string) => {
      return httpClient.delete<ApiResponse>(`/users/${userId}`);
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({
        queryKey: userKeys.lists(),
      });

      toast({
        title: "Success",
        description: response.message,
      });
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
