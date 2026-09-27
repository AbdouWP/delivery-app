import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "@/components/ui/menubar";
import { toast } from "@/components/ui/toast";
import {
  ArrowsClockwiseIcon,
  CheckIcon,
  GridFourIcon,
  PlusIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { cn } from "cn";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { supabase } from "../../../supabase";
import { FilterButton } from "./-components/filter-button";

export const Route = createFileRoute("/admin/orders/")({
  component: AdminOrders,
  loader: () => fetchOrders(),
});

const fetchOrders = async () => {
  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select()
    .order("id", { ascending: true });
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
};

const statusStyles = {
  confirmed: "bg-blue-500/20 text-blue-500 border border-blue-500",
  pending: "bg-orange-500/20 text-orange-500 border border-orange-500",
  cancelled: "bg-red-500/20 text-red-500 border border-red-500",
  delivered: "bg-emerald-500/20 text-emerald-500 border border-emerald-500",
  shipped: "bg-violet-500/20 text-violet-500 border-violet-500",
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
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(checked) => row.toggleSelected(!!checked)}
      />
    ),
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

const initFilters = {
  status: "all",
  agent: "all",
  product: "all",
  wilaya: "all",
  date: {
    start: "",
    end: "",
  },
};

const rowStlyes = {
  confirmed: "bg-blue-600/20",
  pending: "bg-orange-600/20",
  cancelled: "bg-red-600/20",
  delivered: "bg-emerald-600/20",
  shipped: "bg-violet-600/20",
};

const MyTable = lazy(() => import("../../-components/table"));

function AdminOrders() {
  const location = Route.useSearch();
  const navigate = useNavigate();
  const { orders, agents, products } = Route.useLoaderData();

  const [ordersData, setOrdersData] = useState(orders || []);
  const [filters, setFilters] = useState(() => ({
    ...initFilters,
    ...location,
  }));
  const [rowsSelected, setRowssSelected] = useState([]);

  const getTable = (table) =>
    setRowssSelected(table.getSelectedRowModel().rows);

  const refetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select()
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }
    return data;
  };

  const assignToAgent = async (agent) => {
    for (const order of rowsSelected) {
      const { error } = await supabase
        .from("orders")
        .update({ agent })
        .eq("id", order.original.id);
      if (error) {
        console.error(error);
        return;
      }
      toast.add({
        title: "Agent has been assigned",
        type: "success",
      });
      const newOrders = await refetchOrders();
      const filteredOrders = filterOrders(newOrders);
    }
  };

  const changeStatus = async (status) => {
    for (const order of rowsSelected) {
      const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", order.original.id);
      if (error) {
        console.error(error);
        return;
      }
      toast.add({
        title: "Status has been changed",
        type: "success",
      });
      const newOrders = await refetchOrders();
      const filteredOrders = filterOrders(newOrders);
    }
  };

  const filterOrders = useCallback(
    (orders) => {
      const newOrders = orders.filter((order) => {
        if (filters.status !== "all" && order.status !== filters.status)
          return false;
        if (filters.agent !== "all" && order.agent !== filters.agent)
          return false;
        if (filters.product !== "all" && order.product !== filters.product)
          return false;
        if (filters.wilaya !== "all" && order.wilaya !== filters.wilaya)
          return false;
        return true;
      });
      setOrdersData(newOrders);
    },
    [filters.agent, filters.product, filters.status, filters.wilaya],
  );

  useEffect(() => {
    filterOrders(orders);
  }, [filterOrders, orders]);

  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-between items-center border-l">
        <div className="flex gap-2 items-center">
          <Button>
            Create <PlusIcon />
          </Button>
          <Badge variant="ghost" className="text-sm">
            {ordersData?.length} orders
          </Badge>
          <span className="capitalize">
            {filters.status !== "all" && filters.status}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <Menubar>
            <MenubarMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <MenubarTrigger asChild disabled={rowsSelected?.length === 0}>
                    <Button
                      variant="destructive"
                      size="icon"
                      disabled={rowsSelected?.length === 0}
                    >
                      <GridFourIcon />
                    </Button>
                  </MenubarTrigger>
                </TooltipTrigger>
                <TooltipContent>Actions</TooltipContent>
              </Tooltip>

              <MenubarContent>
                <MenubarGroup className="min-w-20">
                  <MenubarSub>
                    <MenubarSubTrigger className="flex items-center gap-1">
                      <UserIcon />
                      Assign to
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      {agents?.map((agent) => (
                        <MenubarItem
                          key={`${agent.name}${agent.id}`}
                          className="capitalize"
                          onClick={() => assignToAgent(agent.name)}
                        >
                          {agent.name}
                        </MenubarItem>
                      ))}
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSub>
                    <MenubarSubTrigger className="flex items-center gap-1">
                      <CheckIcon />
                      Change status to
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      {[
                        "confirmed",
                        "pending",
                        "cancelled",
                        "delivered",
                        "shipped",
                      ].map((status) => (
                        <MenubarItem
                          key={status}
                          className="capitalize"
                          onClick={() => changeStatus(status)}
                        >
                          {status}
                        </MenubarItem>
                      ))}
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarGroup>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  disabled={orders?.length === ordersData?.length}
                  onClick={() => {
                    setFilters(initFilters);
                    navigate({
                      search: undefined,
                    });
                  }}
                  className={`relative before:content-[''] before:absolute before:-top-0.5 before:-right-0.5 before:w-1.5 before:h-1.5 before:bg-red-500 before:rounded-full ${orders?.length === ordersData?.length && "before:hidden"}`}
                >
                  <ArrowsClockwiseIcon />
                </Button>
              }
            />
            <TooltipContent>Reset Filters</TooltipContent>
          </Tooltip>

          <FilterButton
            filters={filters}
            setFilters={setFilters}
            products={products}
            agents={agents}
          />
        </div>
      </div>
      <Suspense fallback="Loading">
        <MyTable
          data={ordersData}
          columns={columns}
          rowAction={(row) =>
            navigate({ to: `/admin/orders/${row.original.id}` })
          }
          rowClassName={(row) => rowStlyes[row.original.status]}
          getTable={(table) => getTable(table)}
        />
      </Suspense>
    </section>
  );
}
