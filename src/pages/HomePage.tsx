import { FileUploadModal } from "@/components/files/upload/FileUploadModal";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col space-y-4 items-center justify-center">
      <h1>File upload</h1>
      <FileUploadModal />
    </div>
  );
}

export default HomePage;
