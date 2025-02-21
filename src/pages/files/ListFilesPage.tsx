import FileList from "@/components/files/FileList";
import { FileUploadModal } from "@/components/files/upload/FileUploadModal";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function ListFilesPage() {
  return (
    <div className="grid gap-4">
      <div className="flex w-full justify-between">
        <Button variant="outline" asChild>
          <Link to="/" className="text-accent underline">
            <ChevronLeftIcon className="h-6 w-6 text-primary" />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Files List</h1>
        <FileUploadModal />
      </div>
      <FileList />
    </div>
  );
}
