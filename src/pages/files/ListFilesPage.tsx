import FileList from "@/components/files/FileList";
import FileTableFilter from "@/components/files/FileTableFilter";
import { FileUploadModal } from "@/components/files/upload/FileUploadModal";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function ListFilesPage() {
  return (
    <div className="grid gap-4">
      <div className="flex w-full justify-between">
        <div className="flex space-x-4">
          <Button variant="outline" asChild>
            <Link to="/" className="text-accent underline">
              <ChevronLeftIcon className="h-6 w-6 text-primary" />
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold">Files List</h1>
        </div>
        <div className="flex space-x-4">
          <FileTableFilter />
          <FileUploadModal />
        </div>
      </div>
      <FileList />
    </div>
  );
}
