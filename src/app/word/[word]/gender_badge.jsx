import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function Gender({ gender, className }) {
  return (
    <div className={cn("flex gap-2", className)}>
      <Badge
        variant={
          gender == "Masculine"
            ? "blue"
            : gender == "Feminine"
            ? "pink"
            : "outline"
        }
      >
        {gender ? gender : "Neutral"}
      </Badge>
    </div>
  );
}
