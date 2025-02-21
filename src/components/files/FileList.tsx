import { ErrorState } from "../ui/error-state";
import { EmptyState } from "../ui/empty-state";
import { FilesIcon } from "lucide-react";
import { FileTableSkeleton } from "./skeleton/FileTableSkeleton";
import { FileTable } from "./FileTable";
import { useFilesQuery } from "@/services/files/hooks/queries/useFileQuery";
import { CardContent } from "@/components/ui/card";
import { FileTypePieChart } from "./FileTypePieChart";
import { FileSizeChunkChart } from "./FileSizeChunkChart";

// Fonction pour parser la taille des fichiers
function parseSize(sizeStr: string) {
  if (sizeStr.includes(" B")) {
    return parseFloat(sizeStr.replace(" B", "")) / 1024 / 1024; // Convertit en MB
  } else if (sizeStr.includes("KB")) {
    return parseFloat(sizeStr.replace(" KB", "")) / 1024; // Convertit en MB
  } else if (sizeStr.includes("MB")) {
    return parseFloat(sizeStr.replace(" MB", ""));
  }
  return 0; // Sécurité si la donnée est mal formée
}

export default function FileList() {
  const { data: files, isLoading, error } = useFilesQuery();

  if (isLoading) {
    return <FileTableSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load files"
        message="There was an error loading the files list. Please try again."
        className="mt-4"
      />
    );
  }

  if (!files?.length) {
    return (
      <EmptyState
        icon={<FilesIcon className="h-8 w-8 text-muted-foreground" />}
        title="No files found"
        description="Your file list is empty. Add your first file to get started."
        className="mt-4"
      />
    );
  }

  const chartData = files
    .map((file) => {
      let originalSize = parseSize(file.stats.originalSize);
      const chunksCount = file.chunksCount;
      return {
        fileSize: originalSize,
        chunkCount: chunksCount,
      };
    })
    .sort((a, b) => a.fileSize - b.fileSize);

  const chartDataMimeType = files.map((file) => {
    let compressedSize = parseSize(file.stats.compressedSize);
    return {
      mimeType: file.mimeType,
      compressedSize: compressedSize,
    };
  });

  return (
    <>
      <div className="border rounded-md">
        <FileTable files={files} />
      </div>
      <CardContent>
        <FileTypePieChart chartDataMimeType={chartDataMimeType} />
      </CardContent>
      <FileSizeChunkChart chartData={chartData} />
    </>
  );
}
