import { DetailedFile } from "@/services/files/types";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Download, Trash2 } from "lucide-react";
import { Progress } from "../ui/progress";
import { useFileDownloadQuery } from "@/services/files/hooks/queries/useFileQuery";
import { useState } from "react";
import { useDeleteFileMutation } from "@/services/files/hooks/mutations/useDeleteFileMutation";
import { FileDeleteDialog } from "./FileDeleteDialog";
import { useNavigate } from "react-router-dom";

interface FileDetailContentProps {
  file: DetailedFile;
}

export const FileDetailContent = ({ file }: FileDetailContentProps) => {
  const navigate = useNavigate();
  const { refetch: downloadFile, isFetching: isDownloading } =
    useFileDownloadQuery({
      id: file.id,
      filename: file.filename,
    });
  const { mutate: deleteFile, isPending: isDeleting } = useDeleteFileMutation();
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="px-6 pb-6 space-y-6">
      {/* File Stats */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted/50">
          <div>
            <p className="text-sm text-muted-foreground">Original Size</p>
            <p className="font-medium font-mono">{file.stats.originalSize}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Compressed Size</p>
            <p className="font-medium font-mono">{file.stats.compressedSize}</p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-muted/50 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Space Saved</p>
            <Badge>{file.stats.spaceSaved}%</Badge>
          </div>
          <Progress value={file.stats.spaceSaved} className="h-2" />
          <p className="text-xs text-muted-foreground text-center">
            Compressed to {file.stats.spaceSaved}% of original size
          </p>
        </div>

        <div className="p-4 rounded-lg bg-muted/50">
          <p className="text-sm text-muted-foreground mb-1">Configuration</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Window Size</span>
              <code className="font-mono">{file.config.windowSize}</code>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Chunk Size</span>
              <div className="flex items-center gap-1">
                <code className="px-2 py-0.5">{file.config.minChunkSize}</code>
                <span className="text-muted-foreground">→</span>
                <code className="px-2 py-0.5">{file.config.maxChunkSize}</code>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Breakpoint Mask</span>
              <code>{file.config.breakpointMask}</code>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Processing Time</span>
              <code>{file.stats.processingTime}</code>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex-row gap-2 flex w-full">
        <Button
          onClick={() => {
            downloadFile();
          }}
          disabled={isDownloading}
          size="sm"
          className="w-full"
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button
          onClick={(e) => {
            setConfirmDelete(true);
            e.stopPropagation();
          }}
          variant="destructive"
          size="sm"
          className="w-full"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>

      <FileDeleteDialog
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={() =>
          deleteFile(file.id, {
            onSuccess: () => {
              setConfirmDelete(false);
              navigate("/files");
            },
          })
        }
        isDeleting={isDeleting}
        filename={file.filename}
      />
    </div>
  );
};
