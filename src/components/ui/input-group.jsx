import { cva } from "class-variance-authority";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function InputGroup({ className, ...props }) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex h-10 w-full min-w-0 items-center rounded-xl border border-input bg-background shadow-2xs transition-all duration-150 ease-out outline-none " +
          "has-focus-visible:border-primary has-focus-visible:ring-2 has-focus-visible:ring-primary/20 " +
          "has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-2 has-[[data-slot][aria-invalid=true]]:ring-destructive/20" +
          "has-[aria-valid=true]:border-green-500 has-[aria-valid=true]:ring-2 has-[aria-valid=true]:ring-green-500/20" +
          "dark:border-input dark:bg-input/20 dark:shadow-none dark:has-focus-visible:ring-primary/35 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 " +
          "has-[textarea]:rounded-xl has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto",
        className,
      )}
      {...props}
    />
  );
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 **:data-[slot=kbd]:rounded-md **:data-[slot=kbd]:bg-muted-foreground/10 **:data-[slot=kbd]:px-1.5 **:data-[slot=kbd]:text-xs [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-3 pr-1",
        "inline-end": "order-last pr-3 pl-1",
        "block-start":
          "order-first w-full justify-start px-3.5 pt-2.5 [.border-b]:pb-2.5",
        "block-end":
          "order-last w-full justify-start px-3.5 pb-2.5 [.border-t]:pt-2.5",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  },
);

function InputGroupAddon({ className, align = "inline-start", ...props }) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if (e.target.closest("button")) {
          return;
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
}

const inputGroupButtonVariants = cva(
  "flex items-center gap-1.5 rounded-lg text-xs font-medium shadow-none",
  {
    variants: {
      size: {
        default: "h-8 px-2.5",
        xs: "h-7 px-2 rounded-md",
        sm: "h-8 px-2.5",
        "icon-xs": "size-7 p-0 rounded-md",
        "icon-sm": "size-8 p-0 rounded-lg",
      },
    },
    defaultVariants: {
      size: "icon-sm",
    },
  },
);

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "icon-sm",
  ...props
}) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupInput({ className, ...props }) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "h-full flex-1 rounded-none border-0 bg-transparent px-3.5 py-2 shadow-none ring-0 aria-valid:ring-0 aria-invalid:ring-0 dark:bg-transparent focus-visible:border-none focus-visible:ring-0 focus-visible:ring-transparent",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupTextarea({ className, ...props }) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent px-3.5 py-2.5 shadow-none ring-0 focus-visible:ring-0 aria-invalid:ring-0 dark:bg-transparent",
        className,
      )}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
