import { ChunkDetailInfo } from "@/services/files/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { Hash } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface FileDetailChunkTableProps {
  fileChunks: ChunkDetailInfo[];
}

export const FileDetailChunkTable = ({
  fileChunks = [],
}: FileDetailChunkTableProps) => {
  return (
    <ScrollArea className="h-[630px] rounded-md p-4">
      <Table>
        <TableHeader className="bg-muted/50 sticky top-0">
          <TableRow>
            <TableHead className="w-[80px]">Order</TableHead>
            <TableHead>Hash</TableHead>
            <TableHead>Original Size</TableHead>
            <TableHead>Compressed Size</TableHead>
            <TableHead>Compression</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fileChunks.map((chunk) => (
            <TableRow key={chunk.hash} className="group hover:bg-muted/50">
              <TableCell>
                <Badge variant="outline" className="font-mono">
                  {chunk.order}
                </Badge>
              </TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono text-xs truncate max-w-[120px]">
                          {chunk.hash}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-mono">{chunk.hash}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <span className="font-mono">{chunk.originalSize}</span>
              </TableCell>
              <TableCell>
                <span className="font-mono">{chunk.compressedSize}</span>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    chunk.isExpanded
                      ? "destructive"
                      : Number(chunk.spaceSaved) > 50
                        ? "success"
                        : "secondary"
                  }
                  className="font-mono"
                >
                  {chunk.spaceSaved}%
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {chunk.compressionType}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
