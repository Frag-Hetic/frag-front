import { UserItemSkeleton } from "./UserItemSkeleton";

export default function UserListSkeleton() {
  return (
    <div className="grid gap-4 mt-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <UserItemSkeleton key={`skeleton-${index}`} />
      ))}
    </div>
  );
}
