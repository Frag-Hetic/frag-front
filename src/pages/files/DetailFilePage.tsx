import FileDetail from "@/components/files/FileDetail";
import { useParams } from "react-router-dom";

export const DetailFilePage = () => {
  const fileId = useParams<{ id: string }>().id;

  if (!fileId) {
    throw new Error("User ID is required");
  }

  return (
    <>
      <h1 className="text-xl font-bold mt-4">File #{fileId}</h1>
      <FileDetail fileId={fileId} />
    </>
  );
};
