import type { User, UserDTO } from "../types";

export const userMapper = {
  toUser: (dto: UserDTO): User => ({
    id: dto.id.toString(),
    name: dto.name,
    email: dto.email,
    avatarInitials: dto.email.slice(0, 2).toUpperCase(),
  }),

  toUserList: (dtos: UserDTO[]): User[] => dtos.map(userMapper.toUser),
};
