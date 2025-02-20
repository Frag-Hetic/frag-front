import { FileChunk } from "@/services/files/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ScrollArea } from "../ui/scroll-area";
import { formatSizeToMbSize, mapStringToDateFormat } from "@/lib/utils";

interface FileDetailChunkTableProps {
  fileChunks: FileChunk[];
}

export const FileDetailChunkTable = ({
  fileChunks,
}: FileDetailChunkTableProps) => {
  return (
    <ScrollArea className="h-[350px] rounded-md p-4">
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Compressed Size</TableHead>
            <TableHead>Original Size</TableHead>
            <TableHead>Compression Type</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Last Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fileChunks.map((fileChunk) => (
            <TableRow key={fileChunk.id + fileChunk.createdAt}>
              <TableCell>{fileChunk.id}</TableCell>
              <TableCell>
                {formatSizeToMbSize(fileChunk.chunk.sizeCompressed)}
              </TableCell>
              <TableCell>
                {formatSizeToMbSize(fileChunk.chunk.sizeOriginal)}
              </TableCell>
              <TableCell>{fileChunk.chunk.compressionType}</TableCell>
              <TableCell>
                {mapStringToDateFormat(fileChunk.createdAt)}
              </TableCell>
              <TableCell>
                {mapStringToDateFormat(fileChunk.updatedAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
