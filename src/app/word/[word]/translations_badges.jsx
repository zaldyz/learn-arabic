import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function Translation({ translation, className }) {
  return (
    <div className={cn("flex gap-2", className)}>
      {translation.map((translation) => (
        <Badge key={translation} variant="secondary">
          {translation}
        </Badge>
      ))}
    </div>
  );
}
