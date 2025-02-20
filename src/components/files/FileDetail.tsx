import { ErrorState } from "../ui/error-state";
import { useFileQuery } from "@/services/files/hooks/queries/useFileQuery";
import { FileDetailSkeleton } from "./FileDetailSkeleton";
import { FileDetailContent } from "./FileDetailContent";
import { Card, CardHeader } from "../ui/card";
import { FileDetailHeader } from "./FileDetailHeader";
import { FileDetailChunkTable } from "./FileDetailChunkTable";

interface FileDetailProps {
  fileId: string;
}

export default function FileDetail({ fileId }: FileDetailProps) {
  const { data: file, isLoading, error } = useFileQuery(fileId);

  if (isLoading) return <FileDetailSkeleton />;

  if (!!error || !file) {
    return (
      <ErrorState
        title={`Failed to load file ${fileId}`}
        message="There was an error loading the file. Please try again."
        className="mt-4"
      />
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader className="pb-2">
          <h2 className="text-lg font-semibold">File Information</h2>
        </CardHeader>
        <FileDetailHeader file={file} />
        <FileDetailContent file={file} />
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">File Chunks</h2>
              <p className="text-sm text-muted-foreground">
                Total chunks: {file.chunkNumber}
              </p>
            </div>
          </div>
        </CardHeader>
        <FileDetailChunkTable fileChunks={file.chunksDetails} />
      </Card>
    </div>
  );
}
