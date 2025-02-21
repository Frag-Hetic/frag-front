import { FileTableHeader } from "../FileTableHeader";
import { Table, TableBody } from "@/components/ui/table";
import { FileTableRowSkeleton } from "./FileTableRowSkeleton";

export const FileTableSkeleton = () => {
  return (
    <div className="border rounded-md">
      <Table>
        <FileTableHeader />
        <TableBody>
          <FileTableRowSkeleton />
        </TableBody>
      </Table>
    </div>
  );
};
