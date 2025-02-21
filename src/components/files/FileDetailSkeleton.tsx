import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader } from "../ui/card";

export function FileDetailSkeleton() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* File Information Card */}
      <Card className="lg:col-span-1">
        <CardHeader className="pb-2">
          <h2 className="text-lg font-semibold">File Information</h2>
        </CardHeader>

        {/* Header Skeleton */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-center mb-6">
            <Skeleton className="h-20 w-20 rounded-full" />
          </div>
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <Skeleton className="h-6 w-[200px] mx-auto" />
              <Skeleton className="h-4 w-[140px] mx-auto" />
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="px-6 pb-6 space-y-6">
          <div className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted/50">
              {[1, 2].map((i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-24" />
                </div>
              ))}
            </div>

            {/* Space Saved */}
            <div className="p-4 rounded-lg bg-muted/50 space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-2 w-full" />
            </div>

            {/* Configuration */}
            <div className="p-4 rounded-lg bg-muted/50">
              <Skeleton className="h-4 w-24 mb-4" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>
      </Card>

      {/* Chunks Card */}
      <Card className="lg:col-span-2">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">File Chunks</h2>
              <Skeleton className="h-4 w-32 mt-1" />
            </div>
          </div>
        </CardHeader>
        <div className="p-4">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-lg bg-muted/50"
              >
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-6 w-24" />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
