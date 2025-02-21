import { useFileFilters } from "@/services/files/hooks/useFileFilters";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FILE_MIMES } from "@/services/files/fileUtils";

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
          {FILE_MIMES.map((fileMime) => (
            <SelectGroup>
              <SelectLabel>{fileMime.label}</SelectLabel>
              {fileMime.mimes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
