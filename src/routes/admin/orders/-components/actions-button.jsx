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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import { toast } from "@/components/ui/toast";

import { CheckIcon, GridFourIcon, UserIcon } from "@phosphor-icons/react";
import { supabase } from "../../../../supabase";

const assignToAgent = async (agent, rows, fun) => {
  const ids = rows.map((r) => r.original.id);
  const { error } = await supabase
    .from("orders")
    .update({ agent })
    .in("id", ids);

  if (error) {
    console.error(error);
    return;
  }

  toast.add({
    title: "Agent has been assigned",
    type: "success",
  });
  fun();
};

const changeStatus = async (status, rows, fun) => {
  const ids = rows.map((r) => r.original.id);
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .in("id", ids);

  if (error) {
    console.error(error);
    return;
  }

  toast.add({
    title: "Status has been changed",
    type: "success",
  });
  fun();
};

export function ActionsButton({ rowsSelected, agents, handleReload }) {
  return (
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

        <MenubarContent className="w-fit max-w-56">
          <MenubarGroup>
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
                    onClick={() =>
                      assignToAgent(agent.name, rowsSelected, handleReload)
                    }
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
                  "reported",
                ].map((status) => (
                  <MenubarItem
                    key={status}
                    className="capitalize"
                    onClick={() =>
                      changeStatus(status, rowsSelected, handleReload)
                    }
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
  );
}
