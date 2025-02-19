import { Skeleton } from "@/components/ui/skeleton";

export function UserItemSkeleton() {
  return (
    <div className="p-4 rounded-lg border border-gray-200 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-3 w-[160px]" />
        </div>
      </div>
      <Skeleton className="h-8 w-[100px]" />
    </div>
  );
}
