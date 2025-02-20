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
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

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
  const { refetch: downloadFile, isFetching: isDownloading } =
    useFileDownloadQuery({
      id: file.id,
      filename: file.filename,
    });

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
        <Badge variant={file.stats.spaceSaved > 50 ? "default" : "secondary"}>
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
              disabled={isDownloading}
            >
              <Download className="mr-2 h-4 w-4" />
              {isDownloading ? "Downloading..." : "Download"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => console.log("Delete", file.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
