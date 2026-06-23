import { Index as MeiliIndex } from "meilisearch"

import { MeiliSearchError } from "../errors/meilisearch-error"
import { Document } from "../types"

// Equivalente ao SearchPostService — usado para o dropdown em tempo real da SearchBar
// Diferenças principais:
// 1. Não tem paginação — retorna apenas os primeiros resultados (limite fixo)
// 2. Não tem filtro de categoria — a busca instantânea é sempre global
// 3. Limite menor (8) para o dropdown não ficar grande demais
// 4. Sem ordenação por data — relevância do Meilisearch decide a ordem
export class SearchDocumentsInstantService {
  constructor(private readonly meili: MeiliIndex<Document>) {}

  async execute(query: string) {
    try {
      const result = await this.meili.search(query, {
        limit: 8,
      })

      return {
        hits: result.hits,
        total: result.estimatedTotalHits,
      }
    } catch {
      throw new MeiliSearchError()
    }
  }
}
