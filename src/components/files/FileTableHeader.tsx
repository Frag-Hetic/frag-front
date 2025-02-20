import { TableHead, TableHeader, TableRow } from "../ui/table";

export const FileTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Nom du fichier</TableHead>
        <TableHead>Size</TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Date de création</TableHead>
        <TableHead>Date de modification</TableHead>
        <TableHead className="text-right">Nb of chunks</TableHead>
        <TableHead className="w-[50px]"></TableHead>
      </TableRow>
    </TableHeader>
  );
};
