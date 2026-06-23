import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

import { MeiliSearchError } from "../errors/meilisearch-error"
import { meiliClient } from "../libs/meili"
import { FetchDocumentsService } from "../services/fetch-documents-service"
import { Document } from "../types"

// Equivalente ao FetchPostsFromMeilisearchController
// Diferenças:
// 1. Índice "documents" em vez de "posts"
// 2. category é string em vez de number
export class FetchDocumentsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const fetchDocumentsSchema = z.object({
      page: z.coerce.number().min(1).default(1),
      perPage: z.coerce.number().min(1).max(100).default(16),
      category: z.string().optional(),
    })

    try {
      const { page, perPage, category } = fetchDocumentsSchema.parse(request.query)

      const meiliIndex = meiliClient.index<Document>("documents")
      const fetchDocumentsService = new FetchDocumentsService(meiliIndex)

      const result = await fetchDocumentsService.execute(page, perPage, category)

      return reply.status(200).send(result)
    } catch (error) {
      if (error instanceof MeiliSearchError) {
        return reply.status(502).send({ message: error.message })
      }

      throw error
    }
  }
}
