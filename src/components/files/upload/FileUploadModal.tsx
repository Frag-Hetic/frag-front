import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileUploadForm } from "./FileUploadForm";
import { useState } from "react";
import { Upload } from "lucide-react";

interface FileUploadModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function FileUploadModal({ open, onOpenChange }: FileUploadModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Use controlled or uncontrolled state
  const dialogOpen = open ?? isOpen;
  const setDialogOpen = onOpenChange ?? setIsOpen;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {/* Only render trigger if we're in uncontrolled mode */}
      {!onOpenChange && (
        <DialogTrigger asChild>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload File
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>
        <FileUploadForm onSuccess={() => setDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
