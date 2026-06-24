import { ArrowUpRight } from 'lucide-react'

import { Post } from '@/types/post'
import { formatDate, getNameCategorysByNumber } from '@/utils'

import { Card, CardContent } from './ui/card'

export const PostCard = (post: Post) => {
  return (
    <Card className="group relative max-h-[248px] min-h-[240px] w-full cursor-pointer overflow-hidden rounded-xl p-4 transition-shadow duration-300 hover:shadow-xl">
      <span className="absolute right-2 top-2 rounded-lg border p-1 opacity-0 shadow-sm duration-300 ease-out group-hover:opacity-100">
        <ArrowUpRight className="text-muted-foreground" />
      </span>

      <CardContent className="p-0">
        <div className="mb-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-900">
          <span className="flex items-center text-center text-[10px] font-bold leading-none text-white">
            {getNameCategorysByNumber(post.categories)}
          </span>
        </div>
        <div className="flex items-start gap-3">
          <div>
            <h3
              className="multiline-title-truncate mb-2 text-base font-medium"
              dangerouslySetInnerHTML={{
                __html: post.title,
              }}
            ></h3>
          </div>
        </div>
        <div>
          {/* antes o leading era leading-3, mudei para ficar legivel nos dados do json */}
          <p
            className="content-paragraph multiline-truncate leading-[1.3] first-letter:uppercase"
            dangerouslySetInnerHTML={{
              __html: post?.content,
            }}
          ></p>
          <div className="absolute bottom-4 right-4 ml-auto mt-2 text-sm text-muted-foreground">
            {formatDate(post?.date)}
          </div>
        </div>
        {/* </div> */}
      </CardContent>
    </Card>
  )
}
