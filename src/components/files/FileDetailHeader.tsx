// src/components/files/FileDetailHeader.tsx
import { DetailedFile } from "@/services/files/types";
import { CalendarClock } from "lucide-react";
import { Separator } from "../ui/separator";

interface FileDetailHeaderProps {
  file: DetailedFile;
}

export const FileDetailHeader = ({ file }: FileDetailHeaderProps) => {
  return (
    <div className="px-6 pb-4">
      {/* Icon */}
      <div className="flex items-center justify-center mb-6">
        <div className="p-4 bg-primary/5 rounded-full transition-transform hover:scale-105">
          {file.fileIcon}
        </div>
      </div>

      {/* File Info */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-semibold tracking-tight truncate max-w-[500px] mx-auto">
            {file.filename}
          </h3>
          <p className="text-sm text-muted-foreground">{file.mimeType}</p>
        </div>

        <Separator />

        {/* Processing Time */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <CalendarClock className="h-4 w-4" />
          <span>Processing time: {file.stats.processingTime}</span>
        </div>
      </div>
    </div>
  );
};
