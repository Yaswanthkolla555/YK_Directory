import { Skeleton } from "@/components/ui/skeleton";

const StartupCardSkeleton = () => {
  return (
    <div className="startup-card_skeleton">
      <Skeleton className="h-48 w-full rounded-t-xl" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex-between mt-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    </div>
  );
};

export default StartupCardSkeleton; 