import { ErrorState } from "../ui/error-state";
import { EmptyState } from "../ui/empty-state";
import { FilesIcon } from "lucide-react";
import { FileTableSkeleton } from "./skeleton/FileTableSkeleton";
import { FileTable } from "./FileTable";
import { useFilesQuery } from "@/services/files/hooks/queries/useFileQuery";

export default function FileList() {
  const { data: files, isLoading, error } = useFilesQuery();

  if (isLoading) {
    return <FileTableSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load users"
        message="There was an error loading the files list. Please try again."
        className="mt-4"
      />
    );
  }

  if (!files?.length) {
    return (
      <EmptyState
        icon={<FilesIcon className="h-8 w-8 text-muted-foreground" />}
        title="No files found"
        description="Your file list is empty. Add your first file to get started."
        className="mt-4"
      />
    );
  }

  return <FileTable files={files} />;
}
