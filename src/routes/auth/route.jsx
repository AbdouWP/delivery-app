import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { OAuth } from "../-components/oauth";

export const Route = createFileRoute("/auth")({
  beforeLoad: () => localStorage.getItem("token") && redirect({ to: "/" }),
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <section className="grid grid-cols-[60%_1fr] max-lg:grid-cols-1 h-full">
      <div className="p-4 flex justify-center-safe items-center-safe">
        <div className="w-3/4 flex flex-col gap-3 max-lg:w-11/12">
          <Outlet />
          {/* <OAuth /> */}
        </div>
      </div>
      <aside className="bg-[url('https://res.cloudinary.com/dvmf6nslc/image/upload/q_auto/f_auto/v1789617590/credit-cards-6462396_1280_uwl75v.jpg')] bg-no-repeat bg-cover bg-center max-lg:hidden">
        <div className="w-full h-full bg-linear-to-t from-[rgba(0,0,0,0.75)] from-10% to-transparent flex flex-col gap-2 justify-end p-4">
          <h1 className="text-4xl font-bold">Your Pathway to Wealth</h1>
          <p className="text-muted-foreground">
            Your step-by-step roadmap to mastering personal finance, investing
            smartly, and securing your financial future.
          </p>
        </div>
      </aside>
    </section>
  );
}
