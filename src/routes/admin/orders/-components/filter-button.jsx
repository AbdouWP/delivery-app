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

import { useLocation, useNavigate } from "@tanstack/react-router";
import { CalendarIcon, FunnelIcon } from "@phosphor-icons/react";
import { memo } from "react";

export const FilterButton = memo(({ products, agents }) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { agent, product } = search;

  const handleFilter = (key, value) =>
    navigate({
      search: (prev) => ({
        ...prev,
        [key]: value === "all" ? undefined : value,
      }),
    });

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
            items={agents}
            onValueChange={(value) => handleFilter("agent", value)}
          >
            <span>Agent</span>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={agent || "All"}
                className="capitalize"
              />
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
            onValueChange={(value) => handleFilter("product", value)}
          >
            <span>Product</span>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={product || "All"}
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
          <Select onValueChange={(value) => handleFilter("type", value)}>
            <span>Delivery Type</span>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={product || "All"}
                className="capitalize"
              />
            </SelectTrigger>

            <SelectContent alignItemWithTrigger={false} align="start">
              <SelectGroup>
                <SelectItem value={"all"} className="capitalize">
                  all
                </SelectItem>
                <SelectItem value={0} className="capitalize">
                  home
                </SelectItem>
                <SelectItem value={1} className="capitalize">
                  stopdesk
                </SelectItem>
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
});
