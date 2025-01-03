import { Skeleton } from "./ui/skelton"

export function CategorySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-1 w-full md:px-24">
      {Array.from({ length: 15 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center p-8 py-16 md:py-16 border border-green-500/20 rounded-sm"
        >
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  )
}

