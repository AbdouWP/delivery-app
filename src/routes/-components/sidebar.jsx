import {
  DiamondsFourIcon,
  GearIcon,
  PackageIcon,
  TicketIcon,
} from "@phosphor-icons/react";
import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "cn";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useUser } from "../../store";
import { profiles } from "../../data";
import { Activity } from "react";

const items = [
  {
    title: "overview",
    children: [
      {
        id: "dashboard",
        name: "Dashboard",
        href: "/admin/dashboard",
        children: [],
        icon: <DiamondsFourIcon />,
      },
    ],
  },
  {
    title: "sales",
    children: [
      {
        id: "orders",
        name: "Orders",
        href: "/admin/orders",
        children: [],
        icon: <TicketIcon />,
      },
      {
        id: "products",
        name: "Products",
        href: "/admin/products",
        children: [],
        icon: <PackageIcon />,
      },
      {
        id: "settings",
        name: "Settings",
        href: "/admin/settings",
        children: [],
        icon: <GearIcon />,
      },
    ],
  },
];

export function Sidebar({ expand }) {
  const location = useLocation();
  const matchPath = location.pathname.split("/").at(2);

  return (
    <aside
      id="admin-sidebar"
      data-status={expand}
      className="h-screen p-1 overflow-hidden flex flex-col bg-sidebar text-sidebar-foreground data-[status='expand']:w-(--expand-width) data-[status='collapse']:w-(--collapse-width) trnasition-[grid-template-columns]"
    >
      <div id="sidebar-header" className="mb-2">
        <img
          src="https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940"
          alt="logo"
          className="w-full h-12 object-cover object-center"
        />
      </div>
      <nav className="flex-1 overflow-y-auto overflow-x-hidden">
        {items.map((item) => (
          <>
            <small
              className={`text-muted-foreground capitalize mb-1 ${!expand && "opacity-0"}`}
            >
              {item.title}
            </small>
            <ul className="list-none" key={item.title}>
              {item.children?.map((child) => (
                <li
                  key={child.id}
                  id={child.id}
                  className={cn(
                    "w-full min-h-8 mb-1 rounded-md flex gap-1 items-center",
                    matchPath === child.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent hover:bg-sidebar-accent",
                  )}
                >
                  <Link
                    to={child.href}
                    preload="intent"
                    className="p-2 py-1 block w-full h-full"
                  >
                    <div
                      className={`flex gap-2 items-center ${!expand && "justify-center"}`}
                    >
                      <span className="">{child.icon}</span>
                      <Activity mode={expand ? "visible" : "hidden"}>
                        <span>{child.name}</span>
                      </Activity>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            {!expand && <Separator />}
          </>
        ))}
      </nav>
      <SidebarFooter expand={expand} />
    </aside>
  );
}

function SidebarFooter({ expand }) {
  const user = useUser((state) => state.user);
  const profile = profiles.find((profile) => profile.email === user.email);

  const fallback_name =
    profile?.username.split(" ")[0][0] + profile?.username.split(" ")[1][0] ||
    profile?.username.split(" ")[0][0];

  return (
    <div
      id="sidebar-footer"
      className="w-full h-16 px-1 rounded-md bg-transparent hover:bg-sidebar-accent"
    >
      <div
        className={`flex gap-1 items-center h-full ${!expand && "justify-center"}`}
      >
        <div>
          <Avatar className="size-10">
            <AvatarImage src={profile?.picture} />
            <AvatarFallback>{fallback_name}</AvatarFallback>
          </Avatar>
        </div>
        <Activity mode={expand ? "visible" : "hidden"}>
          <div>
            <p className="text-sm">{profile?.username}</p>
            <span className="text-xs text-muted-foreground">
              {profile?.email}
            </span>
          </div>
        </Activity>
      </div>
    </div>
  );
}
