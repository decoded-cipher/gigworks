import { Skeleton } from "./ui/skelton"

export function BusinessCardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full md:px-24">
      {Array.from({ length: 16 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center py-16 border border-green-500/20 rounded-xl"
        >
          <Skeleton className="w-16 h-16 rounded-full mb-2" />
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-4 w-28" />
        </div>
      ))}
    </div>
  )
}

