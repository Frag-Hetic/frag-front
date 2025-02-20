import { DetailedFile } from "@/services/files/types";
import { Button } from "../ui/button";
import { Delete, Download } from "lucide-react";

interface FileDetailContentProps {
  file: DetailedFile;
}

export const FileDetailContent = ({ file }: FileDetailContentProps) => {
  return (
    <div className="px-6 space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Original size</span>
          <span className="font-medium">{file.fileSize}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Compressed size</span>
          <span className="font-medium">{file.compressedFileSize}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button className="w-full" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button variant="destructive" size="sm" className="w-full">
          <Delete className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
  );
};
