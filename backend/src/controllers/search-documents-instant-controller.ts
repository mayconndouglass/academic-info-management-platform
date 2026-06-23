import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

import { MeiliSearchError } from "../errors/meilisearch-error"
import { meiliClient } from "../libs/meili"
import { SearchDocumentsInstantService } from "../services/search-documents-instant-service"
import { Document } from "../types"

// Equivalente ao SearchPostController — usado pela SearchBar em tempo real
// Diferenças:
// 1. Índice "documents" em vez de "posts"
// 2. Não lança NoResultsFoundError — retorna array vazio para o front tratar
//    (melhor UX — o dropdown simplesmente mostra "Nenhum resultado")
export class SearchDocumentsInstantController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const searchInstantSchema = z.object({
      q: z.string().min(1),
    })

    try {
      const { q } = searchInstantSchema.parse(request.query)

      const meiliIndex = meiliClient.index<Document>("documents")
      const searchDocumentsInstantService = new SearchDocumentsInstantService(meiliIndex)

      const result = await searchDocumentsInstantService.execute(q)

      return reply.status(200).send(result)
    } catch (error) {
      if (error instanceof MeiliSearchError) {
        return reply.status(502).send({ message: error.message })
      }

      throw error
    }
  }
}
