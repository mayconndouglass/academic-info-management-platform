import { Link } from 'react-router-dom'

import { Post } from '@/types/post'
import {
  formatDate,
  getNameCategorysByNumber,
  stripHtmlAndLimit,
} from '@/utils'

export const SearchResultItem = ({ item }: { item: Post }) => {
  return (
    <Link to={`/post/${item.id}`} className="block w-full" title={item.title}>
      <li className="flex w-full cursor-pointer items-center gap-3 px-3 py-2 hover:bg-gray-100">
        {/* icon */}
        <div className="mt-0.5 flex-shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-900">
            <span className="text-[10px] font-bold text-white">
              {getNameCategorysByNumber(item.categories)}
            </span>
          </div>
        </div>

        {/* content */}
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="mb-1 break-words text-sm font-medium text-gray-800">
            {stripHtmlAndLimit(item.title, 80)}
          </div>

          {item.content && (
            <div className="search-content-preview mb-1 break-words text-sm text-gray-600">
              {stripHtmlAndLimit(item.content, 200)}
            </div>
          )}

          <div className="text-right text-sm text-gray-400">
            {formatDate(item?.date)}
          </div>
        </div>
      </li>
    </Link>
  )
}
