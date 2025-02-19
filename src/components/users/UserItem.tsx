import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDeleteUserMutation } from "@/services/users/hooks/mutations/useDeleteUserMutation";
import type { User } from "@/services/users/types";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface UserItemProps {
  user: User;
  isDetailUser?: boolean;
}

export default function UserItem({
  user,
  isDetailUser = false,
}: UserItemProps) {
  const { mutate: deleteUser, isPending: deleteIsPending } =
    useDeleteUserMutation();

  const navigate = useNavigate();

  const handleUserClick = useCallback(() => {
    if (isDetailUser) return;
    return navigate(`./${user.id}`);
  }, [navigate, user.id, isDetailUser]);

  const handleDeleteUser = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      deleteUser(user.id, {
        onSuccess: () => {
          if (isDetailUser) {
            navigate("../");
          }
        },
      });
    },
    [deleteUser, user.id, isDetailUser, navigate]
  );

  return (
    <div
      onClick={handleUserClick}
      className={cn(
        "p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors space-y-4",
        !isDetailUser && "cursor-pointer"
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback className="bg-primary/10 text-primary">
            {user.avatarInitials}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      <Button
        onClick={handleDeleteUser}
        variant="destructive"
        size="sm"
        className="mt-2"
      >
        {deleteIsPending ? "Deleting..." : "Delete user"}
      </Button>
    </div>
  );
}
