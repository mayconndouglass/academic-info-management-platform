import { FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Document } from '@/types/document-type'
import { formatDate } from '@/utils'

export const DocumentSearchResultItem = ({ item }: { item: Document }) => {
  return (
    <Link
      to={`/document/${item.id}`}
      className="block w-full"
      title={item.title}
    >
      <li className="flex w-full cursor-pointer items-center gap-3 px-3 py-2 hover:bg-gray-100">
        {/* Ícone */}
        <div className="mt-0.5 flex-shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-900">
            <FileText className="h-4 w-4 text-white" />
          </div>
        </div>

        {/* Conteúdo */}
        <div className="min-w-0 flex-1 overflow-hidden">
          {/* Título */}
          <div className="mb-1 break-words text-sm font-medium text-gray-800">
            {item.title}
          </div>

          {/* Categoria e tipo */}
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {item.category || 'Outros'}
            </span>
            <span className="rounded border px-1 py-0.5 text-[10px] font-bold uppercase text-gray-400">
              {item.type}
            </span>
          </div>

          {/* Data */}
          <div className="text-right text-xs text-gray-400">
            {item.date ? formatDate(item.date) : 'Sem data'}
          </div>
        </div>
      </li>
    </Link>
  )
}
