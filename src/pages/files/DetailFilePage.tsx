import FileDetail from "@/components/files/FileDetail";
import { Separator } from "@/components/ui/separator";
import { FileIcon } from "lucide-react";
import { useParams } from "react-router-dom";

export const DetailFilePage = () => {
  const fileId = useParams<{ id: string }>().id;

  if (!fileId) {
    throw new Error("User ID is required");
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <FileIcon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">File Details #{fileId}</h1>
          <p className="text-muted-foreground">
            View and manage file information
          </p>
        </div>
      </div>

      <Separator />
      <FileDetail fileId={fileId} />
    </div>
  );
};
