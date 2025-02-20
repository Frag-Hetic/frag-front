import { File } from "@/services/files/types";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Download, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useFileDownloadQuery } from "@/services/files/hooks/queries/useFileQuery";
import { useState } from "react";
import { TooltipContent } from "@radix-ui/react-tooltip";

interface FileTableRowProps {
  files: File[];
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

const FileTableRowItem = ({ file }: { file: File }) => {
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const { refetch: downloadFile, isFetching } = useFileDownloadQuery({
    id: file.id,
    filename: file.filename,
  });

  return (
    <TableRow>
      <TableCell>{file.id}</TableCell>
      <TableCell>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="block max-w-[200px] truncate">
                {file.filename}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{file.filename}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell>{file.fileSize}</TableCell>
      <TableCell>{file.mimeType}</TableCell>
      <TableCell>{file.createdAt}</TableCell>
      <TableCell>{file.updatedAt}</TableCell>
      <TableCell className="text-right">{file.chunkNumber}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-muted">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              onClick={() => {
                setDownloadingId(file.id);
                downloadFile().finally(() => setDownloadingId(null));
              }}
              disabled={isFetching}
            >
              <Download className="mr-2 h-4 w-4" />
              {isFetching && downloadingId === file.id
                ? "Downloading..."
                : "Download"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                console.log("Delete", file.id);
              }}
              className="text-red-600 focus:text-red-600"
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
