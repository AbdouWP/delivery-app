import { Button } from "@/components/ui/button";

import {
  FacebookLogoIcon,
  GitForkIcon,
  GoogleLogoIcon,
} from "@phosphor-icons/react";
import { useGoogleLogin } from "@react-oauth/google";
import { useUser } from "../../store";
import { useNavigate } from "@tanstack/react-router";

export function OAuth() {
  const setToken = useUser((state) => state.setToken);

  const navigate = useNavigate();

  const handleGoogleOAuth = useGoogleLogin({
    onSuccess: (res) => {
      console.log(res);
      setToken(res.access_token);
      navigate("/");
    },
    onError: (error) => console.log("Failed", error),
  });

  return (
    <>
      <h3 className="text-center text-muted-foreground">Or continue with</h3>
      <div className="grid grid-cols-3 gap-4">
        <Button
          variant="outline"
          size="lg"
          className="w-full hover:bg-linear-to-r from-red-700 via-yellow-700 to-green-700"
          onClick={handleGoogleOAuth}
        >
          <GoogleLogoIcon />
          Google
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full hover:bg-linear-to-r from-indigo-400 via-indigo-600 to-blue-600 hover:border-inidgo-200"
        >
          <FacebookLogoIcon />
          Facebook
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full hover:bg-black! hover:text-white!"
        >
          <GitForkIcon />
          Github
        </Button>
      </div>
    </>
  );
}
