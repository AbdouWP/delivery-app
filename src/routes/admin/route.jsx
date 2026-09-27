import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Sidebar } from "../-components/sidebar";
import { AdminHeader } from "../-components/admin-header";

import { useState } from "react";

export const Route = createFileRoute("/admin")({
  beforeLoad: () => !localStorage.getItem("token") && redirect({ to: "/auth" }),
  component: AdminLayout,
});

const EXPAND_WIDTH = "300px";
const COLLAPSE_WIDTH = "60px";

function AdminLayout() {
  const [expand, setExpand] = useState(true);

  return (
    <div
      data-status={expand}
      style={{
        "--expand-width": EXPAND_WIDTH,
        "--collapse-width": COLLAPSE_WIDTH,
      }}
      className="grid h-screen w-full transition-[grid-template-columns] whitespace-nowrap"
      style={{
        gridTemplateColumns: expand
          ? `${EXPAND_WIDTH} 1fr`
          : `${COLLAPSE_WIDTH} 1fr`,
      }}
    >
      <Sidebar expand={expand} />
      <div className="p-1 flex flex-col gap-3 overflow-y-auto">
        <AdminHeader expand={expand} setExpand={setExpand} />
        <Outlet />
      </div>
    </div>
  );
}
