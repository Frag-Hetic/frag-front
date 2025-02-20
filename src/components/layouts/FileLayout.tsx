import { Outlet } from "react-router-dom";

export default function FileLayout() {
  return (
    <section className="p-8">
      File layout
      <Outlet />
    </section>
  );
}
