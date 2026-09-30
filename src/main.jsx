import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

const router = createRouter({
  routeTree,
});

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <TooltipProvider>
      <RouterProvider router={router} /> <Toaster />
    </TooltipProvider>
  </GoogleOAuthProvider>,
  // </StrictMode>,
);
