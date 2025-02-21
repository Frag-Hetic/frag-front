import FileList from "@/components/files/FileList";
import FileTableFilter from "@/components/files/FileTableFilter";
import { FileUploadModal } from "@/components/files/upload/FileUploadModal";

export default function ListFilesPage() {
  return (
    <div className="grid gap-4">
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-semibold">Files List</h1>
        <div className="flex space-x-4">
          <FileTableFilter />
          <FileUploadModal />
        </div>
      </div>
      <FileList />
    </div>
  );
}
