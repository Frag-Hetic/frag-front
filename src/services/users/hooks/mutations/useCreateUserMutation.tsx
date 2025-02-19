import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/lib/api/httpClient";
import { userKeys } from "../queries/useUserQuery";
import { useToast } from "@/hooks/use-toast";
import type { UserDTO, CreateUserData } from "../../types";

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateUserData) => {
      return httpClient.post<UserDTO>("/users", data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: userKeys.lists() });

      toast({
        title: "Success",
        description: "User created successfully",
      });
    },
    onError: (error) => {
      console.error("error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create user",
        variant: "destructive",
      });
    },
  });
};
