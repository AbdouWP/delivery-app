import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/orders/$id")({
  component: AdminOrder,
  loader: ({ params }) => params.id,
});

function AdminOrder() {
  const id = Route.useLoaderData();

  return <div>Hello "/admin/orders/ {id}"!</div>;
}
