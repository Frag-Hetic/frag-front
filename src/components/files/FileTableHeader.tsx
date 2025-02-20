import { TableHead, TableHeader, TableRow } from "../ui/table";

export const FileTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>File Name</TableHead>
        <TableHead>Size</TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Creation Date</TableHead>
        <TableHead>Last Update Date</TableHead>
        <TableHead className="text-right">Number of Chunks</TableHead>
        <TableHead className="w-[50px]"></TableHead>
      </TableRow>
    </TableHeader>
  );
};
