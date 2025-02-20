import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export const FileTableRowSkeleton = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index} className="group">
          {/* File Info */}
          <TableCell>
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-[20px]" />
                <Skeleton className="h-3 w-[30px]" />
              </div>
            </div>
          </TableCell>

          {/* Original Size */}
          <TableCell>
            <Skeleton className="h-6 w-24 rounded" />
          </TableCell>

          {/* Compressed Size */}
          <TableCell>
            <Skeleton className="h-6 w-24 rounded" />
          </TableCell>

          {/* Space Saved */}
          <TableCell>
            <Skeleton className="h-6 w-16 rounded-full" />
          </TableCell>

          {/* Processing Time */}
          <TableCell>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
            </div>
          </TableCell>

          {/* Window Size */}
          <TableCell>
            <Skeleton className="h-6 w-20 rounded" />
          </TableCell>

          {/* Chunk Size */}
          <TableCell>
            <div className="flex items-center gap-1">
              <Skeleton className="h-6 w-16 rounded" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-6 w-16 rounded" />
            </div>
          </TableCell>

          {/* Mask */}
          <TableCell>
            <Skeleton className="h-6 w-20 rounded" />
          </TableCell>

          {/* Chunks Count */}
          <TableCell>
            <Skeleton className="h-6 w-12 rounded-full" />
          </TableCell>

          {/* Created At */}
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>

          {/* Actions */}
          <TableCell>
            <div className="flex justify-end">
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
