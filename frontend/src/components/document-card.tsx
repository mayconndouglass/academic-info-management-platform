import { ArrowUpRight, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Document } from '@/types/document-type'
import { formatDate } from '@/utils'

import { Card, CardContent } from './ui/card'

export const DocumentCard = (doc: Document) => {
  return (
    <Link to={`/document/${doc.id}`}>
      <Card className="group relative w-full cursor-pointer overflow-hidden rounded-xl p-4 pb-16 transition-shadow duration-300 hover:shadow-xl">
        {/* Botão de detalhes — navega para a página de detalhe do documento */}
        <Link
          to={`/document/${doc.id}`}
          className="absolute right-2 top-2 rounded-lg border p-1 opacity-0 shadow-sm duration-300 ease-out group-hover:opacity-100"
          title="Ver detalhes"
        >
          <ArrowUpRight className="text-muted-foreground" />
        </Link>

        <CardContent className="p-0">
          {/* Ícone de categoria */}
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-900">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              {doc.category || 'Outros'}
            </span>
          </div>

          {/* Título */}
          <h3 className="multiline-title-truncate mb-2 text-base font-medium">
            {doc.title}
          </h3>

          {/* Tipo do arquivo */}
          <span className="inline-block rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">
            {doc.type}
          </span>

          {/* Rodapé — data e botão de abrir documento */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {doc.date ? formatDate(doc.date) : 'Sem data'}
            </span>

            {/* Botão de abrir o documento direto em nova aba */}
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="Abrir documento"
              className="flex items-center gap-1 rounded-lg border px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-blue-900 hover:text-blue-900"
            >
              {/* <ExternalLink className="h-3 w-3" /> */}
              Abrir
            </a>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
