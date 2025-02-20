import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUploadFileMutation } from "@/services/files/hooks/mutations/useUploadFileMutation";
import { cn } from "@/lib/utils";
import { Upload, FileIcon, X } from "lucide-react";
import { useState } from "react";

interface FileUploadFormProps {
  onSuccess?: () => void;
}

export function FileUploadForm({ onSuccess }: FileUploadFormProps) {
  const { mutate: uploadFile, isPending } = useUploadFileMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    uploadFile(
      { file: selectedFile },
      {
        onSuccess: () => {
          setSelectedFile(null);
          onSuccess?.();
        },
      }
    );
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid w-full gap-1.5">
        <label
          htmlFor="file"
          className={cn(
            "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer",
            "hover:bg-primary/5 transition-colors",
            "border-primary/20",
            isPending && "pointer-events-none opacity-50"
          )}
        >
          {!selectedFile ? (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="h-8 w-8 text-primary/50 mb-2" />
              <p className="text-sm text-muted-foreground">
                {isPending
                  ? "Uploading..."
                  : "Drag and drop or click to select"}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full p-4">
              <div className="flex items-center gap-3">
                <FileIcon className="h-8 w-8 text-primary/50" />
                <div className="flex flex-col">
                  <p className="text-sm font-medium truncate max-w-[200px]">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedFile(null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          <Input
            id="file"
            type="file"
            className="hidden"
            disabled={isPending}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setSelectedFile(file);
            }}
          />
        </label>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isPending || !selectedFile}>
          {isPending ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </form>
  );
}
