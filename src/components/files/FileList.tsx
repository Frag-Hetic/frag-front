import { ErrorState } from "../ui/error-state";
import { EmptyState } from "../ui/empty-state";
import { FilesIcon } from "lucide-react";
import { FileTableSkeleton } from "./skeleton/FileTableSkeleton";
import { FileTable } from "./FileTable";
import { useFilesQuery } from "@/services/files/hooks/queries/useFileQuery";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FileTypePieChart } from "./FileTypePieChart";

export default function FileList() {
  const { data: files, isLoading, error } = useFilesQuery();

  console.log(files);

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

  // Mapping des fichiers pour obtenir le format souhaité pour File Size vs Chunk Count
  const chartData = files
    .map((file) => {
      let originalSize = parseFloat(file.stats.originalSize.replace(" KB", "").replace(" MB", ""));
      // Si la taille est en KB, la convertir en MB
      if (file.stats.originalSize.includes("KB")) {
        originalSize = originalSize / 1024; // Conversion en MB
      }
      const chunksCount = file.chunksCount;
      return {
        fileSize: originalSize, // Taille du fichier en MB
        chunkCount: chunksCount, // Nombre de chunks
      };
    })
    .sort((a, b) => a.fileSize - b.fileSize);

  // Mapping des fichiers pour obtenir le format souhaité pour MimeType et CompressedSize
  const chartDataMimeType = files
    .map((file) => {
      let compressedSize = parseFloat(file.stats.compressedSize.replace(" KB", "").replace(" MB", ""));
      // Si la taille est en KB, la convertir en MB
      if (file.stats.compressedSize.includes("KB")) {
        compressedSize = compressedSize / 1024; // Conversion en MB
      }
      return {
        mimeType: file.mimeType, // Type MIME du fichier
        compressedSize: compressedSize, // Taille compressée en MB
      };
    });

  console.log("Mime Type and Compressed Size Data:", chartDataMimeType); // Affiche les données MimeType et CompressedSize

  return (
    <>
      <div className="border rounded-md">
        <FileTable files={files} />
      </div>
      <CardContent>
        <FileTypePieChart chartDataMimeType={chartDataMimeType} />
      </CardContent>
      <Card>
        <CardHeader>
          <CardTitle>File Size vs Chunk Count</CardTitle>
          <CardDescription>Showing the relationship between file size and chunk count</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="fileSize"
                label={{ value: 'File Size (MB)', position: 'insideBottomRight', offset: -5 }}
                tickFormatter={(value) => `${value} MB`}
              />
              <YAxis
                label={{ value: 'Chunk Count', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="chunkCount"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
}
