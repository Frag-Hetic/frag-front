import { ErrorState } from "../ui/error-state";
import { useFileQuery } from "@/services/files/hooks/queries/useFileQuery";
import { FileDetailSkeleton } from "./FileDetailSkeleton";
import { FileDetailContent } from "./FileDetailContent";
import { Card } from "../ui/card";
import { FileDetailHeader } from "./FileDetailHeader";
import { FileDetailChunkTable } from "./FileDetailChunkTable";

interface FileDetailProps {
  fileId: string;
}

export default function FileDetail({ fileId }: FileDetailProps) {
  const { data: file, isLoading, error } = useFileQuery(fileId);
  if (isLoading) {
    return (
      <div className="grid gap-4 mt-4">
        <FileDetailSkeleton />
      </div>
    );
  }

  if (!!error || file === undefined) {
    return (
      <ErrorState
        title={`Failed to load file ${fileId}`}
        message="There was an error loading the file. Please try again."
        className="mt-4"
      />
    );
  }

  console.log("file", file);

  return (
    <div className="flex flex-row gap-4 mt-4">
      <div>
        <h1 className="text-xl font-bold mt-4">Details</h1>
        <Card className="h-[350px] rounded-md border p-4">
          <FileDetailHeader file={file} />
          <FileDetailContent file={file} />
        </Card>
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold mt-4">
          File Chunks : {file.chunkNumber}
        </h1>
        <FileDetailChunkTable fileChunks={file.filesChunks} />
      </div>
    </div>
  );
}
