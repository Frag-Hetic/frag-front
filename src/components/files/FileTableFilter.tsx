import { useFileFilters } from "@/services/files/hooks/useFileFilters";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function FileTableFilter() {
  const { filters, updateFilter } = useFileFilters();

  return (
    <div className="flex space-x-4">
      <Input
        placeholder="Filter name..."
        value={filters.fileName}
        onChange={(e) => updateFilter("fileName", e.target.value)}
        className="max-w-sm"
      />
      <Select
        value={filters.mimeType ?? "all"}
        onValueChange={(value) => updateFilter("mimeType", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Type de fichier" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous</SelectItem>
          <SelectItem value="image">Images</SelectItem>
          <SelectItem value="video">Vidéos</SelectItem>
          <SelectItem value="document">Documents</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
