import { useEffect } from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { useTheme } from "../store";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const mode = useTheme((state) => state.mode);
  const setMode = useTheme((state) => state.setMode);

  useEffect(() => {
    setMode(mode);
  }, [mode, setMode]);

  return (
    <div className="w-full h-screen overflow-y-auto">
      <Outlet />
    </div>
  );
}
