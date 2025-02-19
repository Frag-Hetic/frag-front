import { useUsersQuery } from "@/services/users/hooks/queries/useUserQuery";
import UserItem from "./UserItem";
import UserListSkeleton from "./skeleton/UserListSkeleton";
import { ErrorState } from "../ui/error-state";
import { EmptyState } from "../ui/empty-state";
import { UsersIcon } from "lucide-react";

export default function UserList() {
  const { data: users, isLoading, error } = useUsersQuery();

  if (isLoading) {
    return <UserListSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load users"
        message="There was an error loading the users list. Please try again."
        className="mt-4"
      />
    );
  }

  if (!users?.length) {
    return (
      <EmptyState
        icon={<UsersIcon className="h-8 w-8 text-muted-foreground" />}
        title="No users found"
        description="Your users list is empty. Add your first user to get started."
        className="mt-4"
      />
    );
  }

  return (
    <div className="grid gap-4 mt-4">
      {users?.map((user) => <UserItem key={user.id} user={user} />)}
    </div>
  );
}
