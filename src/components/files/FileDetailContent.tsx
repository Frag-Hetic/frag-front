import { DetailedFile } from "@/services/files/types";
import { CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Delete, Download } from "lucide-react";

interface FileDetailContentProps {
  file: DetailedFile;
}

export const FileDetailContent = ({ file }: FileDetailContentProps) => {
  return (
    <>
      <CardContent className="font-bold flex flex-col gap-2">
        <p>Original size : {file.fileSize}</p>
        <p>Compressed size : {file.compressedFileSize}</p>
      </CardContent>
      <CardContent className="flex flex-row gap-1">
        <Button
          size="sm"
          variant="default"
          onClick={() => {
            console.log("Download file");
          }}
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        <Button
          onClick={() => {
            console.log("Delete file");
          }}
          size="sm"
          variant="destructive"
        >
          <Delete className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardContent>
    </>
  );
};
