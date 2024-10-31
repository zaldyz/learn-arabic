import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function Tags({ tags, className }) {
  return (
    <div className={cn("flex gap-2", className)}>
      {tags.length ? (
        tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))
      ) : (
        <Badge variant="secondary">{"No Tags"}</Badge>
      )}
      {}
    </div>
  );
}
