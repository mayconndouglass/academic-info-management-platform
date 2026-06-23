import { Index as MeiliIndex } from "meilisearch"

import { MeiliSearchError } from "../errors/meilisearch-error"
import { Document } from "../types"

// Equivalente ao FetchPostsFromMeilisearch, mas para documentos
// Diferenças principais:
// 1. Trabalha com o índice "documents" em vez de "posts"
// 2. Filtro de categoria é string ("Editais") em vez de number (1)
// 3. Ordena por date:desc por padrão para mostrar os mais recentes primeiro
export class FetchDocumentsService {
  constructor(private readonly meili: MeiliIndex<Document>) {}

  async execute(page = 1, perPage = 16, category?: string) {
    const offset = (page - 1) * perPage

    // Categoria agora é string — "Editais", "Resoluções", etc
    // antes era número inteiro do WordPress
    const filter = category ? `category = "${category}"` : undefined

    try {
      const result = await this.meili.search("", {
        limit: perPage,
        offset,
        sort: ["date:desc"],
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
