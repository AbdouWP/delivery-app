import { create } from "zustand";

export const useTheme = create((set) => ({
  mode:
    localStorage.getItem("theme") === "system" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : localStorage.getItem("theme") || "light",
  setMode: (newMode) => {
    let mode = newMode;

    set({ mode });
    localStorage.setItem("theme", mode);
    if (newMode.toLowerCase() === "system") {
      const m = window.matchMedia("(prefers-color-scheme: dark)").matches;
      mode = m ? "dark" : "light";
    }
    document.documentElement.classList = [];
    document.documentElement.classList.add(mode);
  },
}));

export const useUser = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || {},
  setUser: (newUser) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    set({ user: newUser });
  },
  token: localStorage.getItem("token"),
  isAuthenticated: JSON.parse(localStorage.getItem("user")) ? true : false,
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: undefined, isAuthenticated: false, user: {} });
  },
}));
