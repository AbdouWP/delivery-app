import { supabase } from "./supabase";

export const fetchProfile = async () => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("You are not logged in!");

  try {
    const res = await fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("An error happened!", error.message);
  }
};

export const refetchOrders = async () => {
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
