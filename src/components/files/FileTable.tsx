import { FileListItem } from "@/services/files/types";
import { Table } from "../ui/table";
import { FileTableHeader } from "./FileTableHeader";
import { FileTableRow } from "./FileTableRow";

interface FileTableProps {
  files: FileListItem[];
}

export const FileTable = ({ files }: FileTableProps) => {
  return (
    <div className="grid gap-4 mt-4">
      <h1 className="text-2xl font-semibold">Files List</h1>
      <div className={"border rounded-md"}>
        <Table>
          <FileTableHeader />
          <FileTableRow files={files} />
        </Table>
      </div>
    </div>
  );
};
