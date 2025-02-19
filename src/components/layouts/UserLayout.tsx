import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <section className="p-8">
      User layout
      <Outlet />
    </section>
  );
}
