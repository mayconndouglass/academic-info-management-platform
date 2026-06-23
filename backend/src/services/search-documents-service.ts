import { Index as MeiliIndex } from "meilisearch"

import { MeiliSearchError } from "../errors/meilisearch-error"
import { Document } from "../types"

// Equivalente ao SearchPostsFromMeilisearchService, mas para documentos
// Diferenças principais:
// 1. Filtro de categoria é string em vez de number
// 2. Removemos attributesToHighlight e attributesToCrop de "content"
//    pois documentos não têm conteúdo extraído — só metadados
// 3. Busca nos campos title, slug, category, pageOrigin
export class SearchDocumentsService {
  constructor(private readonly meili: MeiliIndex<Document>) {}

  async execute(query: string, page = 1, perPage = 16, category?: string) {
    const offset = (page - 1) * perPage
    const filter = category ? `category = "${category}"` : undefined

    try {
      const result = await this.meili.search(query, {
        limit: perPage,
        offset,
        filter,
      })

      return {
        documents: result.hits,
        totalItems: result.estimatedTotalHits,
        totalPages: Math.ceil((result.estimatedTotalHits ?? 0) / perPage),
      }
    } catch {
      throw new MeiliSearchError()
    }
  }
}
