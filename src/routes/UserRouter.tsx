import { Route, Routes } from "react-router-dom";
import ListUsersPage from "@/pages/users/ListUsersPage";
import DetailUserPage from "@/pages/users/DetailUserPage";
import UserLayout from "@/components/layouts/UserLayout";

export default function UserRouter() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<ListUsersPage />} />
        <Route path="/:id" element={<DetailUserPage />} />
        <Route path="/*" element={<div>not found</div>} />
      </Route>
    </Routes>
  );
}
