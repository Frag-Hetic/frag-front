import { useQuery } from "@tanstack/react-query";
import type { User, UserDTO } from "../../types";
import { httpClient } from "@/lib/api/httpClient";
import { userMapper } from "../../mappers/UserMapper";

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  detail: (id: string) => [...userKeys.all, "detail", id] as const,
};

export const useUsersQuery = () => {
  return useQuery<User[]>({
    queryKey: userKeys.lists(),
    queryFn: async () => {
      const response = await httpClient.get<UserDTO[]>("/users");
      return userMapper.toUserList(response);
    },
  });
};

export const useUserQuery = (userId: string) => {
  return useQuery<User>({
    queryKey: userKeys.detail(userId),
    queryFn: async () => {
      const response = await httpClient.get<UserDTO>(`/users/${userId}`);
      return userMapper.toUser(response);
    },
  });
};
