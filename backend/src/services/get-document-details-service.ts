import { Index as MeiliIndex } from "meilisearch"

import { MeiliSearchError } from "../errors/meilisearch-error"
import { Document } from "../types"

// Equivalente ao GetPostDetailsFromMeilisearch
// Diferenças:
// 1. id é string (hash MD5) em vez de number
// 2. Lança MeiliSearchError se o documento não for encontrado
//    em vez de um PostNotFoundError — vamos tratar isso no controller
export class GetDocumentDetailsService {
  constructor(private readonly meili: MeiliIndex<Document>) {}

  async execute(id: string) {
    try {
      const document = await this.meili.getDocument(id)
      return document
    } catch {
      // Meilisearch lança erro quando o documento não existe
      // repassamos como MeiliSearchError para o controller tratar
      throw new MeiliSearchError()
    }
  }
}
