// components/post-details-skeleton.tsx
import { Skeleton } from './ui/skeleton'

export function PageDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse">
      {/* Cabeçalho com quadradinho azul */}
      <div className="mb-6 flex items-center">
        {/* Quadradinho azul */}
        <Skeleton className="mr-4 h-14 w-14 rounded-2xl bg-blue-900" />

        <div className="flex-1">
          {/* Título */}
          <Skeleton className="mb-2 h-6 w-3/4" />
          {/* Data */}
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="mb-16 border-b border-gray-200 pb-16">
        {/* Subtítulo */}
        <Skeleton className="mb-4 h-7 w-2/3" />
        {/* Data do conteúdo */}
        <Skeleton className="mb-6 h-4 w-40" />

        {/* Parágrafos do conteúdo */}
        <div className="flex flex-col gap-6">
          {/* Primeiro parágrafo */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Segundo parágrafo */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          {/* Terceiro parágrafo */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </div>

      {/* Rodapé com link */}
      <div>
        <Skeleton className="mb-2 h-4 w-64" />
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  )
}
