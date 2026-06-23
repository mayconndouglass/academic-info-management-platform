import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

import { MeiliSearchError } from "../errors/meilisearch-error"
import { meiliClient } from "../libs/meili"
import { GetDocumentDetailsService } from "../services/get-document-details-service"
import { Document } from "../types"

// Equivalente ao GetPostDetailsFromMeilisearchController
// Diferenças:
// 1. id é string (hash MD5) em vez de number
// 2. Retorna 404 quando o documento não é encontrado
//    em vez de deixar o erro estourar
export class GetDocumentDetailsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const getDocumentSchema = z.object({
      id: z.string().min(1),
    })

    try {
      const { id } = getDocumentSchema.parse(request.params)

      const meiliIndex = meiliClient.index<Document>("documents")
      const getDocumentDetailsService = new GetDocumentDetailsService(meiliIndex)

      const document = await getDocumentDetailsService.execute(id)

      return reply.status(200).send(document)
    } catch (error) {
      if (error instanceof MeiliSearchError) {
        // Documento não encontrado ou erro no Meilisearch
        return reply.status(404).send({ message: "Documento não encontrado" })
      }

      throw error
    }
  }
}
