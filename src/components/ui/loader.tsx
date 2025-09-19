import { Skeleton } from "./skeleton";
import { Progress } from "./progress";

export function AppLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] w-full gap-4">
      <Progress className="w-1/2 max-w-xs" value={80} />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-32" />
      </div>
      <Skeleton className="h-4 w-40" />
    </div>
  );
}
