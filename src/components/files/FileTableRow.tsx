import { FileListItem } from "@/services/files/types";
import { TableBody, TableCell, TableRow } from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Clock, Download, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useFileDownloadQuery } from "@/services/files/hooks/queries/useFileQuery";
import { useState } from "react";
import { useDeleteFileMutation } from "@/services/files/hooks/mutations/useDeleteFileMutation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";

interface FileTableRowProps {
  files: FileListItem[];
}

export const FileTableRow = ({ files }: FileTableRowProps) => {
  return (
    <TableBody>
      {files.map((file) => (
        <FileTableRowItem key={file.id} file={file} />
      ))}
    </TableBody>
  );
};

const FileTableRowItem = ({ file }: { file: FileListItem }) => {
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { refetch: downloadFile, isFetching } = useFileDownloadQuery({
    id: file.id,
    filename: file.filename,
  });
  const { mutate: deleteFile, isPending: isDeleting } = useDeleteFileMutation();

  return (
    <TableRow
      onClick={() => navigate(`./${file.id}`)}
      className="group hover:bg-muted/50 cursor-pointer"
    >
      {/* File Info */}
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-muted p-1">
            {file.fileIcon}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-medium truncate max-w-[200px]">
              {file.filename}
            </span>
            <span className="text-xs text-muted-foreground">
              {file.mimeType}
            </span>
          </div>
        </div>
      </TableCell>

      {/* Original Size */}
      <TableCell>
        <code className="text-sm bg-muted rounded px-2 py-0.5">
          {file.stats.originalSize}
        </code>
      </TableCell>

      {/* Compressed Size */}
      <TableCell>
        <code className="text-sm bg-muted rounded px-2 py-0.5">
          {file.stats.compressedSize}
        </code>
      </TableCell>

      {/* Space Saved */}
      <TableCell>
        <Badge variant={file.stats.spaceSaved > 50 ? "success" : "secondary"}>
          {file.stats.spaceSaved}%
        </Badge>
      </TableCell>

      {/* Processing Time */}
      <TableCell>
        <div className="flex gap-2">
          <Clock className="h-3 w-3 text-muted-foreground" />
          <code className="text-xs">{file.stats.processingTime}</code>
        </div>
      </TableCell>

      {/* Window Size */}
      <TableCell>
        <code className="text-sm bg-muted rounded px-2 py-0.5">
          {file.config.windowSize}
        </code>
      </TableCell>

      {/* Chunk Sizes (Combined) */}
      <TableCell>
        <div className="flex items-center gap-1 cursor-default">
          <code className="text-sm bg-muted rounded px-2 py-0.5">
            {file.config.minChunkSize}
          </code>
          <span className="text-muted-foreground">→</span>
          <code className="text-sm bg-muted rounded px-2 py-0.5">
            {file.config.maxChunkSize}
          </code>
        </div>
      </TableCell>

      {/* Breakpoint Mask */}
      <TableCell>
        <code className="text-sm bg-muted rounded px-2 py-0.5">
          {file.config.breakpointMask}
        </code>
      </TableCell>

      {/* Chunks Count */}
      <TableCell>
        <Badge variant="outline">{file.chunksCount}</Badge>
      </TableCell>

      {/* Update Date */}
      <TableCell>
        <time className="text-sm text-muted-foreground">
          {file.dates.updated}
        </time>
      </TableCell>

      {/* Actions */}
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                downloadFile();
                e.stopPropagation();
              }}
              disabled={isFetching}
            >
              <Download className="mr-2 h-4 w-4" />
              {isFetching ? "Downloading..." : "Download"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => {
                setConfirmDelete(true);
                e.stopPropagation();
              }}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>

      <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <DialogContent>
          <DialogTitle>Delete the file</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the file {file.filename}?
          </DialogDescription>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={(e) => {
                deleteFile(file.id, {
                  onSuccess: () => setConfirmDelete(false),
                });
                e.stopPropagation();
              }}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TableRow>
  );
};
