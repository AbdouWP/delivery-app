import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverHeader,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useNavigate } from "@tanstack/react-router";
import { CalendarIcon, FunnelIcon } from "@phosphor-icons/react";

export function FilterButton({ filters, setFilters, products, agents }) {
  const navigate = useNavigate();

  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger
          render={
            <PopoverTrigger
              render={
                <Button variant="outline" size="icon">
                  <FunnelIcon />
                </Button>
              }
            />
          }
        />
        <TooltipContent>Filter</TooltipContent>
        <PopoverContent align="bottom">
          <PopoverHeader>Filter By:</PopoverHeader>
          <Select
            items={["all", "confirmed", "pending", "cancelled", "delivered"]}
            onValueChange={(value) => {
              setFilters((prev) => ({ ...prev, status: value }));
              navigate({
                search: (prev) => ({
                  ...prev,
                  status: value === "all" ? undefined : value,
                }),
              });
            }}
          >
            <span>Status</span>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={filters.status}
                className="capitalize"
              />
            </SelectTrigger>

            <SelectContent alignItemWithTrigger={false} align="start">
              <SelectGroup>
                {["all", "confirmed", "pending", "cancelled", "delivered"].map(
                  (status) => (
                    <SelectItem
                      key={status}
                      value={status}
                      className="capitalize"
                    >
                      {status}
                    </SelectItem>
                  ),
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            items={agents}
            onValueChange={(value) => {
              setFilters((prev) => ({ ...prev, agent: value }));
              navigate({
                search: (prev) => ({
                  ...prev,
                  agent: value === "all" ? undefined : value,
                }),
              });
            }}
          >
            <span>Agent</span>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={filters.agent} className="capitalize" />
            </SelectTrigger>

            <SelectContent alignItemWithTrigger={false} align="start">
              <SelectGroup>
                <SelectItem value={"all"} className="capitalize">
                  All
                </SelectItem>
                {agents.map((agent) => (
                  <SelectItem
                    key={agent.name + agent.id}
                    value={agent.name}
                    className="capitalize"
                  >
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            items={products}
            onValueChange={(value) => {
              setFilters((prev) => ({ ...prev, product: value }));
              navigate({
                search: (prev) => ({
                  ...prev,
                  product: value === "all" ? undefined : value,
                }),
              });
            }}
          >
            <span>Product</span>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={filters.product}
                className="capitalize"
              />
            </SelectTrigger>

            <SelectContent alignItemWithTrigger={false} align="start">
              <SelectGroup>
                <SelectItem value={"all"} className="capitalize">
                  All
                </SelectItem>
                {products.map((product) => (
                  <SelectItem
                    key={product.id}
                    value={product.name}
                    className="capitalize"
                  >
                    {product.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="w-full">
            <Popover>
              <span>From</span>
              <PopoverTrigger className="w-full">
                <InputGroup className="h-7! rounded-sm!">
                  <InputGroupInput placeholder={"dd/mm/yyyy"} />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton>
                      <CalendarIcon />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </PopoverTrigger>

              <PopoverContent>
                <Calendar />
              </PopoverContent>
            </Popover>
          </div>
          <div className="w-full">
            <Popover>
              <span>to</span>
              <PopoverTrigger className="w-full">
                <InputGroup className="h-7! rounded-sm!">
                  <InputGroupInput placeholder={"dd/mm/yyyy"} />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton>
                      <CalendarIcon />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </PopoverTrigger>

              <PopoverContent>
                <Calendar />
              </PopoverContent>
            </Popover>
          </div>
        </PopoverContent>
      </Tooltip>
    </Popover>
  );
}
