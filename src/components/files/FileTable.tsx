import { FileListItem } from "@/services/files/types";
import { Table } from "../ui/table";
import { FileTableHeader } from "./FileTableHeader";
import { FileTableRow } from "./FileTableRow";

interface FileTableProps {
  files: FileListItem[];
}

export const FileTable = ({ files }: FileTableProps) => {
  return (
    <Table>
      <FileTableHeader />
      <FileTableRow files={files} />
    </Table>
  );
};
