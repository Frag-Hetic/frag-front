export interface UserDTO {
  id: number;
  name: string;
  email: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
}

export type CreateUserData = Pick<UserDTO, "name" | "email">;
