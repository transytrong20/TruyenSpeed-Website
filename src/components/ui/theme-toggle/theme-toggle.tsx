import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";
import { ComponentPropsWithoutRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        {...({ asChild: true } as ComponentPropsWithoutRef<typeof DropdownMenuTrigger>)}
      >
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Changer le thème</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          {...({ onClick: () => setTheme("light") } as ComponentPropsWithoutRef<
            typeof DropdownMenuItem
          >)}
        >
          Sáng
        </DropdownMenuItem>
        <DropdownMenuItem
          {...({ onClick: () => setTheme("dark") } as ComponentPropsWithoutRef<
            typeof DropdownMenuItem
          >)}
        >
          Tối
        </DropdownMenuItem>
        <DropdownMenuItem
          {...({ onClick: () => setTheme("system") } as ComponentPropsWithoutRef<
            typeof DropdownMenuItem
          >)}
        >
          Hệ thống
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
