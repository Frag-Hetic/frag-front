import { DetailedFile } from "@/services/files/types";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";

interface FileDetailHeaderProps {
  file: DetailedFile;
}

export const FileDetailHeader = ({ file }: FileDetailHeaderProps) => {
  return (
    <CardHeader>
      {file.fileIcon}
      <CardTitle className="text-xl">{file.filename}</CardTitle>
      <CardDescription>{file.mimeType}</CardDescription>
    </CardHeader>
  );
};
