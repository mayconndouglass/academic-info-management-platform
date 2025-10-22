import { Skeleton } from '@/components/ui/skeleton'

export function SearchItemSkeleton() {
  return (
    <li className="flex cursor-default items-start gap-3.5 px-4 py-3">
      {/* icon */}
      <Skeleton className="h-8 w-8 flex-shrink-0 rounded-lg" />

      <div className="min-w-0 flex-1 space-y-2">
        {/* title */}
        <Skeleton className="h-4 w-3/4" />

        {/* content */}
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />

        {/* date */}
        <div className="mt-2 flex justify-end">
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
    </li>
  )
}
