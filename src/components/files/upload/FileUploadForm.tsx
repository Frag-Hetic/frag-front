import { useForm } from "react-hook-form";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useUploadFileMutation } from "@/services/files/hooks/mutations/useUploadFileMutation";
import { useState } from "react";
import { FileIcon, UploadIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultValues = {
  config: {
    windowSize: 48,
    chunkMinSize: 1024,
    chunkMaxSize: 8192,
    breakpointMask: "0x1FFF",
  },
};

interface FileUploadFormProps {
  onSuccess?: () => void;
}

export function FileUploadForm({ onSuccess }: FileUploadFormProps) {
  const { mutate: uploadFile, isPending } = useUploadFileMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm({
    defaultValues,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append(
      "windowSize",
      form.getValues("config.windowSize").toString()
    );
    formData.append(
      "chunkMinSize",
      form.getValues("config.chunkMinSize").toString()
    );
    formData.append(
      "chunkMaxSize",
      form.getValues("config.chunkMaxSize").toString()
    );
    formData.append("breakpointMask", form.getValues("config.breakpointMask"));

    uploadFile(
      { file: selectedFile, config: form.getValues("config") },
      {
        onSuccess: () => {
          setSelectedFile(null);
          form.reset(defaultValues);
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
              <UploadIcon className="h-8 w-8 text-primary/50 mb-2" />
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
                <XIcon className="h-4 w-4" />
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

      <Accordion type="single" collapsible>
        <AccordionItem value="config">
          <AccordionTrigger>Advanced Configuration</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {/* Window Size */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Window Size</Label>
                  <span className="text-sm text-muted-foreground">
                    {form.watch("config.windowSize")} bytes
                  </span>
                </div>
                <Slider
                  min={32}
                  max={64}
                  step={8}
                  defaultValue={[defaultValues.config.windowSize]}
                  onValueChange={([value]) =>
                    form.setValue("config.windowSize", value)
                  }
                />
              </div>

              {/* Chunk Min Size */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Min Chunk Size</Label>
                  <span className="text-sm text-muted-foreground">
                    {form.watch("config.chunkMinSize")} bytes
                  </span>
                </div>
                <Slider
                  min={512}
                  max={4096}
                  step={512}
                  defaultValue={[defaultValues.config.chunkMinSize]}
                  onValueChange={([value]) =>
                    form.setValue("config.chunkMinSize", value)
                  }
                />
              </div>

              {/* Chunk Max Size */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Max Chunk Size</Label>
                  <span className="text-sm text-muted-foreground">
                    {form.watch("config.chunkMaxSize")} bytes
                  </span>
                </div>
                <Slider
                  min={4096}
                  max={16384}
                  step={1024}
                  defaultValue={[defaultValues.config.chunkMaxSize]}
                  onValueChange={([value]) =>
                    form.setValue("config.chunkMaxSize", value)
                  }
                />
              </div>

              {/* Breakpoint Mask */}
              <div className="space-y-2">
                <Label>Breakpoint Mask</Label>
                <Select
                  onValueChange={(value) =>
                    form.setValue("config.breakpointMask", value)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="0x1FFF" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0x1FFF">0x1FFF</SelectItem>
                    <SelectItem value="0x3FFF">0x3FFF</SelectItem>
                    <SelectItem value="0x0FFF">0x0FFF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isPending || !selectedFile}>
          {isPending ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </form>
  );
}
