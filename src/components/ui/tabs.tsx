"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Tabs as TabsPrimitive } from "radix-ui";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className,
      )}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-4xl p-[3px] text-muted-foreground group-data-horizontal/tabs:h-9 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col group-data-vertical/tabs:rounded-2xl data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        brand:
          "h-auto gap-1 rounded-full border border-white/45 bg-white/35 p-1 text-foreground/70 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.38),0_20px_45px_-28px_rgb(219_39_119_/_0.65)] backdrop-blur-xl dark:border-white/10 dark:bg-white/8 dark:text-white/70 dark:shadow-[inset_0_1px_0_rgb(255_255_255_/_0.06),0_20px_45px_-28px_rgb(0_0_0_/_0.75)]",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start group-data-vertical/tabs:px-2.5 group-data-vertical/tabs:py-1.5 hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=brand]/tabs-list:min-h-11 group-data-[variant=brand]/tabs-list:rounded-full group-data-[variant=brand]/tabs-list:px-4 group-data-[variant=brand]/tabs-list:font-semibold group-data-[variant=brand]/tabs-list:text-foreground/72 group-data-[variant=brand]/tabs-list:hover:bg-white/35 group-data-[variant=brand]/tabs-list:hover:text-foreground dark:group-data-[variant=brand]/tabs-list:text-white/72 dark:group-data-[variant=brand]/tabs-list:hover:bg-white/8 dark:group-data-[variant=brand]/tabs-list:hover:text-white",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "group-data-[variant=brand]/tabs-list:data-active:-translate-y-px group-data-[variant=brand]/tabs-list:data-active:border-pink-200/80 group-data-[variant=brand]/tabs-list:data-active:bg-white/92 group-data-[variant=brand]/tabs-list:data-active:text-foreground group-data-[variant=brand]/tabs-list:data-active:shadow-[0_16px_35px_-18px_rgb(219_39_119_/_0.75)] group-data-[variant=brand]/tabs-list:data-active:[&_svg]:scale-105 dark:group-data-[variant=brand]/tabs-list:data-active:border-fuchsia-300/30 dark:group-data-[variant=brand]/tabs-list:data-active:bg-white/14 dark:group-data-[variant=brand]/tabs-list:data-active:text-white dark:group-data-[variant=brand]/tabs-list:data-active:shadow-[0_16px_35px_-20px_rgb(0_0_0_/_0.8)]",
        "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger, tabsListVariants };
