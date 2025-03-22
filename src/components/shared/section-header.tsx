import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  href?: string;
  className?: string;
}

export function SectionHeader({
  title,
  href,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between mb-4",
        className
      )}
    >
      <h2 className="text-xl font-bold tracking-tight md:text-2xl">{title}</h2>
      {href && (
        <Link
          href={href}
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Xem tất cả
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
