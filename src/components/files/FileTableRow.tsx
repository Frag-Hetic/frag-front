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
import { useDeleteFileMutation } from "@/services/files/hooks/mutations/useDeleteFileMutation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";

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
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { refetch: downloadFile, isFetching } = useFileDownloadQuery({
    id: file.id,
    filename: file.filename,
  });
  const { mutate: deleteFile, isPending: isDeleting } = useDeleteFileMutation();

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
              onClick={() => setConfirmDelete(true)}
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
              onClick={() => {
                deleteFile(file.id, {
                  onSuccess: () => setConfirmDelete(false),
                });
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
