import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface GenreBadgeProps {
  genre: string;
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export function GenreBadge({
  genre,
  className,
  onClick,
  isActive = false,
}: GenreBadgeProps) {
  return (
    <Badge
      variant={isActive ? "default" : "outline"}
      className={cn(
        "cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors",
        className
      )}
      onClick={onClick}
    >
      {genre}
    </Badge>
  );
}
