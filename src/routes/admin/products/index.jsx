import { createFileRoute } from "@tanstack/react-router";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { supabase } from "@/supabase";
import Table from "../../-components/table";

export const Route = createFileRoute("/admin/products/")({
  component: AdminProducts,
  loader: fetchProducts,
});

async function fetchProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });
  if (error) {
    console.error(error);
    return;
  }
  return data;
}

const columns = [
  {
    accessorKey: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsSomeRowsSelected()}
          onCheckedChange={(checked) => table.toggleAllRowsSelected(!!checked)}
        />
      );
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(checked) => row.toggleSelected(!!checked)}
      />
    ),
    canAction: false,
  },
  {
    accessorKey: "img",
    header: "Image",
    cell: ({ row }) => <span>{row.original.image}</span>,
    canAction: true,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span>{row.original.name}</span>,
    canAction: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Switch
        defaultChecked={row.original.status}
        onCheckedChange={async (checked) => {
          const { error } = await supabase
            .from("products")
            .update({ status: checked })
            .eq("id", row.original.id);

          if (error) {
            console.error(error);
            return;
          }
        }}
      />
    ),
    canAction: false,
  },
];

function AdminProducts() {
  const products = Route.useLoaderData();
  const [productsData, setProductData] = useState(products || []);

  return <Table data={productsData} columns={columns} />;
}
