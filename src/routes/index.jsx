import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useUser } from "../store";

import { googleLogout } from "@react-oauth/google";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchProfile } from "../crud";

export const Route = createFileRoute("/")({
  beforeLoad: () => !localStorage.getItem("token") && redirect({ to: "/auth" }),
  loader: fetchProfile,
  component: MainPage,
});

function MainPage() {
  const navigate = useNavigate();
  const logout = useUser((state) => state.logout);

  const user = Route.useLoaderData();

  const { given_name, family_name, picture, email } = user;

  const fallbackName = given_name?.at(0) + family_name?.at(0);

  const handleLogout = () => {
    logout();
    googleLogout();
    navigate({ to: "/auth" });
  };

  return (
    <header className="p-2 flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <Avatar className="size-12">
          <AvatarImage src={picture} />
          <AvatarFallback>{fallbackName}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm">
            {given_name} {family_name}
          </p>
          <small className="text-xs">{email}</small>
        </div>
      </div>
      <Button link to="/admin">
        Admin
      </Button>
      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
}
