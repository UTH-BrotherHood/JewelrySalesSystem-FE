"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { IconMoon, IconSun } from "@tabler/icons-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="shrink-0"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <IconSun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <IconMoon className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
}
