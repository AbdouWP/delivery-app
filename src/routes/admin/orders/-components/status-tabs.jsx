import { useLocation, useNavigate } from "@tanstack/react-router";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function StatusTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <Tabs
        defaultValue={location.search.status || "All"}
        onValueChange={(value) =>
          navigate({
            search: (prev) => ({
              ...prev,
              status: value === "all" ? undefined : value,
            }),
          })
        }
      >
        <TabsList>
          <TabsTrigger
            value={"all"}
            className={`capitalize`}
            data-active={
              location.search.status === "all" || !location.search.status
            }
          >
            All
          </TabsTrigger>
          {[
            "confirmed",
            "pending",
            "cancelled",
            "delivered",
            "shipped",
            "reported",
          ].map((status) => (
            <TabsTrigger
              value={status}
              className={`capitalize`}
              data-active={location.search.status === status}
            >
              {status}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
