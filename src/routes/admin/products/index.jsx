import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { lazy, Suspense, useMemo } from "react";
import { supabase } from "@/supabase";
import { PlusIcon } from "@phosphor-icons/react";
import {
  tableFeatures,
  useTable,
  rowSelectionFeature,
} from "@tanstack/react-table";

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

const MyTable = lazy(() => import("../../-components/table"));

const features = tableFeatures({ rowSelectionFeature });

function AdminProducts() {
  const products = Route.useLoaderData() || [];
  const router = useRouter();

  const handleReloadData = async () => {
    await router.invalidate();
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "select",
        header: ({ table }) => {
          return (
            <Checkbox
              checked={table.getIsSomeRowsSelected()}
              onCheckedChange={(checked) =>
                table.toggleAllRowsSelected(!!checked)
              }
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
              handleReloadData();
            }}
          />
        ),
        canAction: false,
      },
    ],
    [],
  );

  const tableInstance = useTable({
    data: products,
    columns,
    features,
  });

  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-between items-center border-l">
        <div className="flex gap-2 items-center">
          <Button>
            Create <PlusIcon />
          </Button>
          <Badge variant="ghost" className="text-sm">
            {products.length} products
          </Badge>
        </div>
        <div className="flex gap-2 items-center"></div>
      </div>
      <Suspense fallback="Loading">
        <MyTable
          table={tableInstance}
          // rowAction={(row) =>
          //   navigate({ to: `/admin/orders/${row.original.id}` })
          // }
          // rowClassName={(row) => rowStlyes[row.original.status]}
        />
      </Suspense>
    </section>
  );
}
