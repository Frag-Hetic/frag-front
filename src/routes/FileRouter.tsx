import FileLayout from "@/components/layouts/FileLayout";
import { DetailFilePage } from "@/pages/files/DetailFilePage";
import ListFilesPage from "@/pages/files/ListFilesPage";
import { Route, Routes } from "react-router-dom";

export default function FileRouter() {
  return (
    <Routes>
      <Route element={<FileLayout />}>
        <Route path="/" element={<ListFilesPage />} />
        <Route path="/:id" element={<DetailFilePage />} />
        <Route path="/*" element={<div>not found</div>} />
      </Route>
    </Routes>
  );
}
