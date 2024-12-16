/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent } from './ui/card'
import { Skeleton } from './ui/skeleton'

export const CardSkeleton = () => {
  return Array.from({ length: 16 }).map((_, i) => {
    return (
      <Card
        key={i}
        className="relative max-h-[248px] min-h-[240px] w-full cursor-pointer overflow-hidden p-4 transition-shadow duration-300 hover:shadow-xl"
      >
        <CardContent className="p-0">
          <Skeleton className="mb-2 h-8 w-8 flex-shrink-0 rounded-lg" />
          <div className="flex items-start gap-3">
            <Skeleton className="mb-3 h-12 w-full" />
          </div>
          <div>
            <p className="content-paragraph multiline-truncate leading-3 first-letter:uppercase">
              <Skeleton className="h-20 w-full" />
            </p>
            <div className="absolute bottom-4 right-4 ml-auto mt-2 text-sm text-muted-foreground">
              <Skeleton className="h-5 min-w-20" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  })
}
