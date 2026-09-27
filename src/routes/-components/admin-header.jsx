import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowsOutIcon,
  BellIcon,
  CornersInIcon,
  MoonIcon,
  SunIcon,
} from "@phosphor-icons/react";
import { useTheme } from "../../store";
import { memo } from "react";

export function AdminHeader({ expand, setExpand }) {
  const mode = useTheme((state) => state.mode);
  const setMode = useTheme((state) => state.setMode);
  const pathname = location.pathname.split("/")[2];

  return (
    <header
      id="admin-header"
      className="w-full h-12 p-1 bg-sidebar text-sidebar-foreground flex justify-between items-center rounded-es-lg rounded-md"
    >
      <div>
        <h3 className="capitalize font-bold text-xl">{pathname}</h3>
      </div>
      <div id="admin-header-buttons" className="flex gap-0.5">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                className="active:bg-primary active:text-primary-foreground"
              >
                <BellIcon />
              </Button>
            }
          />
          <TooltipContent>Notifications</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                className="active:bg-primary active:text-primary-foreground"
                onClick={() => setMode(mode === "light" ? "dark" : "light")}
              >
                {mode === "dark" ? <SunIcon /> : <MoonIcon />}
              </Button>
            }
          />
          <TooltipContent>
            {mode === "dark" ? "Light" : "Dark"}
            {" Mode"}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                className="active:bg-primary active:text-primary-foreground"
                onClick={() => setExpand((prev) => !prev)}
              >
                {expand ? <CornersInIcon /> : <ArrowsOutIcon />}
              </Button>
            }
          />
          <TooltipContent>{expand ? "Collapse" : "Expand"}</TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}
