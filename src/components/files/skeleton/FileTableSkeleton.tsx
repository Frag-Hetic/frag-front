import { FileTableHeader } from "../FileTableHeader";
import { Table, TableBody } from "@/components/ui/table";
import { FileTableRowSkeleton } from "./FileTableRowSkeleton";

export const FileTableSkeleton = () => {
  return (
    <div className="grid gap-4 mt-4">
      <h1 className="text-2xl font-semibold">Files List</h1>
      <div className={"border rounded-md"}>
        <Table>
          <FileTableHeader />
          <TableBody>
            <FileTableRowSkeleton />
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
