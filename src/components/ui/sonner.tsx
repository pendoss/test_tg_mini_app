"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import * as React from "react";

interface ToasterProps extends React.ComponentProps<typeof Sonner> {}

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as any}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
