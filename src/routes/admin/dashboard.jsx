import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "../../supabase";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <section className="flex-1 overflow-y-auto">
      <div className="grid grid-cols-3 gap-2">
        <DataCards />
      </div>
    </section>
  );
}

function DataCards() {
  const [activeProducts, setActiveProducts] = useState(0);

  useEffect(() => {
    async function fetchActiveProducts() {
      const { data } = await supabase
        .from("products")
        .select("status")
        .eq("status", true);

      setActiveProducts(data.length);
    }
    fetchActiveProducts();
  }, []);

  return (
    <>
      <article>
        <Card className={"bg-blue-500/20 border border-blue-500!"}>
          <CardHeader>
            <CardTitle className="text-blue-500">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            content
            <CardDescription>Hello World</CardDescription>
          </CardContent>
        </Card>
      </article>
      <article>
        <Card className={"bg-emerald-500/20 border border-emerald-500!"}>
          <CardHeader>
            <CardTitle className="text-emerald-500">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            performance
            <CardDescription>Hello World</CardDescription>
          </CardContent>
        </Card>
      </article>
      <article>
        <Card className={"bg-violet-500/20 border border-violet-500!"}>
          <CardHeader>
            <CardTitle className="text-violet-500">Products</CardTitle>
            <CardAction>
              <Button variant="ghost" link to="/admin/products">
                Check
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            Active Products ({activeProducts})
            <CardDescription>Hello World</CardDescription>
          </CardContent>
        </Card>
      </article>
    </>
  );
}
