import { useUserQuery } from "@/services/users/hooks/queries/useUserQuery";
import UserItem from "./UserItem";
import { UserItemSkeleton } from "./skeleton/UserItemSkeleton";
import { ErrorState } from "../ui/error-state";

interface UserDetailProps {
  userId: string;
}

export default function UserDetail({ userId }: UserDetailProps) {
  const { data: user, isLoading, error } = useUserQuery(userId);

  if (isLoading) {
    return (
      <div className="grid gap-4 mt-4">
        <UserItemSkeleton />
      </div>
    );
  }

  if (!!error || user === undefined) {
    return (
      <ErrorState
        title={`Failed to load user ${userId}`}
        message="There was an error loading the user. Please try again."
        className="mt-4"
      />
    );
  }

  return (
    <div className="grid gap-4 mt-4">
      <UserItem key={user.id} user={user} isDetailUser />
    </div>
  );
}
