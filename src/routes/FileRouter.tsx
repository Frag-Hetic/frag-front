import FileLayout from "@/components/layouts/FileLayout";
import ListFilesPage from "@/pages/files/ListFilesPage";
import { Route, Routes } from "react-router-dom";

export default function FileRouter() {
  return (
    <Routes>
      <Route element={<FileLayout />}>
        <Route path="/list" element={<ListFilesPage />} />
        <Route path="/*" element={<div>not found</div>} />
      </Route>
    </Routes>
  );
}
