import { Skeleton } from "@/components/ui/skeleton";

export default function WordsLoading() {
  return (
    <div>
      <div className="flex items-center justify-between py-4 gap-3">
        <Skeleton className="w-[400px] h-10" />
        <Skeleton className="w-[100px] h-10" />
      </div>
      <div className="flex-col justify-between rounded-md">
        <Skeleton className="h-16 mb-2" />
        <Skeleton className="h-16 my-2" />
        <Skeleton className="h-16 my-2" />
        <Skeleton className="h-16 my-2" />
        <Skeleton className="h-16 my-2" />
        <Skeleton className="h-16 my-2" />
        <Skeleton className="h-16 my-2" />
        <Skeleton className="h-16 mt-2" />
      </div>
    </div>
  );
}
