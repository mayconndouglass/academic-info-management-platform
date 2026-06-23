import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

import { MeiliSearchError } from "../errors/meilisearch-error"
import { meiliClient } from "../libs/meili"
import { SearchDocumentsService } from "../services/search-documents-service"
import { Document } from "../types"

// Equivalente ao SearchPostsFromMeilisearchController
// Diferenças:
// 1. Índice "documents" em vez de "posts"
// 2. category é string em vez de number
export class SearchDocumentsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const searchDocumentsSchema = z.object({
      q: z.string().min(1),
      page: z.coerce.number().min(1).default(1),
      perPage: z.coerce.number().min(1).max(100).default(16),
      category: z.string().optional(),
    })

    try {
      const { q, page, perPage, category } = searchDocumentsSchema.parse(request.query)

      const meiliIndex = meiliClient.index<Document>("documents")
      const searchDocumentsService = new SearchDocumentsService(meiliIndex)

      const result = await searchDocumentsService.execute(q, page, perPage, category)

      return reply.status(200).send(result)
    } catch (error) {
      if (error instanceof MeiliSearchError) {
        return reply.status(502).send({ message: error.message })
      }

      throw error
    }
  }
}
