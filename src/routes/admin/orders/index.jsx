import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowsClockwiseIcon,
  BuildingApartmentIcon,
  HouseIcon,
  PlusIcon,
  XIcon,
} from "@phosphor-icons/react";
import { cn } from "cn";
import { lazy, Suspense } from "react";
import { supabase } from "../../../supabase";
import { FilterButton } from "./-components/filter-button";
import { ActionsButton } from "./-components/actions-button";
import {
  tableFeatures,
  rowSelectionFeature,
  useTable,
} from "@tanstack/react-table";
import { StatusTabs } from "./-components/status-tabs";

export const Route = createFileRoute("/admin/orders/")({
  component: AdminOrders,
  loaderDeps: ({ search }) => ({
    ...search,
    page: search.page,
    limit: search.limit,
  }),
  loader: ({ deps }) => fetchOrders(deps.page, deps.limit, deps),
});

async function getFilterOrders(filters, from, to) {
  let query = supabase
    .from("orders")
    .select("*", { count: "exact" })
    .range(from, to)
    .order("id", { ascending: true });

  Object.entries(filters).forEach(([column, value]) => {
    if (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      value !== "all"
    ) {
      query = query.eq(column, value);
    }
  });

  return await query;
}

async function fetchOrders(page = 1, limit = 10, deps) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data: orders, error: ordersError } = await getFilterOrders(
    { ...deps, page: null, limit: null },
    from,
    to,
  );

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select();

  const { data: agents, error: agentsError } = await supabase
    .from("agents")
    .select();

  if (ordersError || agentsError || productsError) {
    console.error(ordersError || agentsError || productsError);
    return;
  }

  return { orders, agents, products };
}

const statusStyles = {
  confirmed: "bg-blue-500/20 text-blue-500 border border-blue-500",
  pending: "bg-orange-500/20 text-orange-500 border border-orange-500",
  cancelled: "bg-red-500/20 text-red-500 border border-red-500",
  delivered: "bg-emerald-500/20 text-emerald-500 border border-emerald-500",
  shipped: "bg-violet-500/20 text-violet-500 border-violet-500",
  reported: "bg-indigo-500/20 text-indigo-500 border-indigo-500",
};

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
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(checked) => row.toggleSelected(!!checked)}
        />
      );
    },
    canAction: false,
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => <span>{row.original.customer}</span>,
    canAction: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge className={cn(statusStyles[row.original.status], "capitalize")}>
        {row.original.status}
      </Badge>
    ),
    canAction: true,
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => <span>{row.original.product}</span>,
    canAction: true,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <span>
        {row.original.wilaya} - {row.original.commune}
      </span>
    ),
    canAction: true,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.original.type === 0 ? (
          <>
            <HouseIcon />
            Home Delivery
          </>
        ) : (
          <>
            <BuildingApartmentIcon />
            Stopdesk
          </>
        )}
      </Badge>
    ),
    canAction: true,
  },
  {
    accessorKey: "agent",
    header: "Agent",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.original.agent}
      </Badge>
    ),
    canAction: true,
  },
];

const rowStlyes = {
  confirmed: "bg-blue-600/20",
  pending: "bg-orange-600/20",
  cancelled: "bg-red-600/20",
  delivered: "bg-emerald-600/20",
  shipped: "bg-violet-600/20",
  reported: "bg-indigo-600/20",
};

const MyTable = lazy(() => import("../../-components/table"));

const features = tableFeatures({ rowSelectionFeature });

function AdminOrders() {
  const location = Route.useSearch();
  const navigate = useNavigate();
  const router = useRouter();
  const { orders, agents, products } = Route.useLoaderData() || {
    orders: [],
    agents: [],
    products: [],
  };

  const tableInstance = useTable({
    data: orders,
    columns,
    features,
    getRowId: (row) => row.id,
  });

  const selectedRows = tableInstance.getSelectedRowModel().rows;
  const { resetRowSelection } = tableInstance;

  const handleReloadData = async () => {
    await router.invalidate();
    await resetRowSelection();
  };

  return (
    <section className="flex flex-col gap-2">
      <StatusTabs />
      <div className="flex justify-between items-center border-l">
        <div className="flex gap-2 items-center">
          <Button>
            Create <PlusIcon />
          </Button>
          <Badge variant="ghost" className="text-sm">
            {orders.length} orders
          </Badge>
        </div>
        <div>
          <div className="flex gap-2 items-center justify-end">
            <ActionsButton
              rowsSelected={selectedRows}
              handleReload={handleReloadData}
              agents={agents}
            />

            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      navigate({
                        search: undefined,
                      })
                    }
                    className={`relative before:content-[''] before:absolute before:-top-0.5 before:-right-0.5 before:w-1.5 before:h-1.5 before:bg-red-500 before:rounded-full ${"before:hidden"}`}
                  >
                    <ArrowsClockwiseIcon />
                  </Button>
                }
              />
              <TooltipContent>Reset Filters</TooltipContent>
            </Tooltip>

            <FilterButton products={products} agents={agents} />
          </div>
          <div className="flex gap-1 items-center wrap max-w-1/2 mt-2">
            {Object.keys(location).map((key) =>
              ["status", "page", "limit"].includes(key) ? null : location[
                  key
                ] === "" || location[key] === "all" ? null : (
                <Badge
                  variant="secondary"
                  className="capitalize border-dashed border-primary"
                >
                  {key === "type"
                    ? location[key] === 0
                      ? "Delivery Type: home"
                      : "Delivery Type: stopdesk"
                    : `${key}: ${location[key]}`}
                  <span
                    onClick={() =>
                      navigate({
                        search: (prev) => ({
                          ...prev,
                          [key]: undefined,
                        }),
                      })
                    }
                  >
                    <XIcon />
                  </span>
                </Badge>
              ),
            )}
          </div>
        </div>
      </div>
      <Suspense fallback="Loading">
        <MyTable
          table={tableInstance}
          rowAction={(row) =>
            navigate({ to: `/admin/orders/${row.original.id}` })
          }
          rowClassName={(row) => rowStlyes[row.original.status]}
        />
      </Suspense>
    </section>
  );
}
