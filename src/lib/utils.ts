import { QueryClient } from "@tanstack/react-query";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeByIdFromQueryCaches<TItem>(
  client: QueryClient,
  rootKey: readonly unknown[],
  id: string | number,
  getItemId: (item: TItem) => string | number
) {
  const matchingQueries = client.getQueriesData<{
    data: TItem[];
    total?: number;
  }>({ queryKey: rootKey });

  matchingQueries.forEach(([key, cached]) => {
    if (!cached) return;
    const present = cached.data.some(
      (item) => String(getItemId(item)) === String(id)
    );
    if (!present) return;
    const nextData = cached.data.filter(
      (item) => String(getItemId(item)) !== String(id)
    );
    client.setQueryData(key, {
      ...cached,
      data: nextData,
      total: Math.max(0, (cached.total ?? 0) - 1),
    });
  });
}
