import { TableHead, TableHeader, TableRow } from "../ui/table";

export const FileTableHeader = () => {
  return (
    <TableHeader className="bg-muted/50">
      <TableRow>
        <TableHead>File</TableHead>
        <TableHead>Original Size</TableHead>
        <TableHead>Compressed Size</TableHead>
        <TableHead>Space Saved</TableHead>
        <TableHead>Processing</TableHead>
        <TableHead>Window Size</TableHead>
        <TableHead>Chunk Size</TableHead>
        <TableHead>Mask</TableHead>
        <TableHead>Chunks</TableHead>
        <TableHead>Created At</TableHead>
        <TableHead className="w-[70px]" />
      </TableRow>
    </TableHeader>
  );
};
